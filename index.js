const init = require('./init.js');
const Koa = require('koa');
const statics = require('mm_statics');
const xmlParser = require("mm_xml");
const session = require('mm_session');
const compress = require('koa-compress');
const websocket = require('koa-websocket');
const koaBody = require('koa-body');
const waf = require('./waf.js');
const cluster = require('cluster');
const compose = require('koa-compose');


/**
 * MM类
 * @class
 */
class MM {
	/**
	 * 构造函数
	 * @constructor
	 * @param {Object} config 配置参数
	 * @param {Object} server koa应用服务
	 */
	constructor(config, server = new Koa()) {
		/**
		 * 配置参数
		 * @type {Object}
		 */
		this.config = {
			/**
			 * web服务配置
			 * @type {Object}
			 */
			web: {
				/**
				 * 监听地址
				 * @type {String}
				 */
				host: "0.0.0.0",
				/**
				 * 监听端口
				 * @type {Number}
				 */
				port: 5000,
				/**
				 * 是否输出操作日志
				 * @type {Boolean}
				 */
				log: false,
				/**
				 * 线程数, 0为根据CPU核心数创建线程数
				 * @type {Number}
				 */
				threads: 1
			},
			/**
			 * 路径配置
			 * @type {Object}
			 */
			path: {
				/**
				 * 程序根目录路
				 * @type {String}
				 */
				root: $.runPath,
				/**
				 * 应用根目录
				 * @type {Number}
				 */
				app: "./app".fullname(),
				/**
				 * 静态文件跟目录
				 * @type {String}
				 */
				static: './bin/static'.fullname($.binPath)
			},
			/**
			 * 系统项
			 * @type {Object}
			 */
			sys: {
				/**
				 * 服务端名称
				 * @type {String}
				 */
				name: "mm",
				/**
				 * 服务端中文名
				 * @type {String}
				 */
				title: "超级美眉",
				/**
				 * 缓存方式, 选填 redis, cache, memory
				 * @type {String}
				 */
				cache: "redis",
				/**
				 * 数据存储方式
				 * @type {String}
				 */
				db: "mysql",
				/**
				 * 是否启用定时任务服务
				 * @type {Boolean}
				 */
				task: false,
				/**
				 * 是否启用压缩
				 * @type {Boolean}
				 */
				compress: false,
				/**
				 * 是否启用静态文件处理器
				 * @type {Boolean}
				 */
				static: true,
				/**
				 * 是否引用com函数
				 */
				com: true,
				/**
				 * 是否启用websocket通讯
				 */
				websocket: true,
				/**
				 * 使用外事件
				 */
				event: true
			},
			/**
			 * 外缓存配置
			 */
			redis: {
				/**
				 * 服务器地址
				 * @type {String}
				 */
				host: "127.0.0.1",
				/**
				 * 端口号
				 * @type {Number}
				 */
				port: 6379,
				/**
				 * 密码
				 * @type {String}
				 */
				password: "asd123",
				/**
				 * 选用的数据库0-9
				 * @type {Number}
				 */
				database: 0,
				/**
				 * 键前缀
				 * @type {String}
				 */
				prefix: "mm_"
			},
			/**
			 * Mysql数据库存储配置
			 */
			mysql: {
				/**
				 * 服务器地址
				 * @type {String}
				 */
				host: "127.0.0.1",
				/**
				 * 端口号
				 * @type {Number}
				 */
				port: 3306,
				/**
				 * 用户名
				 * @type {String}
				 */
				user: "root",
				/**
				 * 密码
				 * @type {String}
				 */
				password: "asd123",
				/**
				 * 数据库名称
				 * @type {String}
				 */
				database: "mm"
			},
			/**
			 * mongo数据库存储配置
			 */
			mongodb: {
				/**
				 * 服务器地址
				 */
				host: "localhost",
				/**
				 * 端口号
				 */
				port: 27017,
				/**
				 * 数据库名
				 */
				database: "mm",
				/**
				 * 用户名
				 */
				user: "admin",
				/**
				 * 密码
				 */
				password: "asd123"
			},
			/**
			 * 重定向
			 */
			redirect: {
				// 将m.开头的域名指向到/phone/路由路径
				"m.*": "/phone/",
				"pad.*": "/pad/",
				"tv.*": "/tv/"
			},
			/**
			 * 代理
			 */
			proxy: {
				// 转发到web socket服务器
				webscoket: {
					path: ["/ws/*"],
					com: ["*"]
				},
				// 转发到开发者服务器
				dev: {
					path: ["/dev/*", "/api/dev/*"],
					com: ["task", "app"]
				}
			}
		};

		if (config) {
			$.push(this.config, config, true);
		}

		/**
		 * 数据库管理器
		 */
		this.db = {};

		/**
		 * 事件集合
		 */
		this.events = {
			/**
			 * 请求前
			 */
			before: [],
			/**
			 * 验证
			 */
			check: [],
			/**
			 * 主要
			 */
			main: [],
			/**
			 * 渲染
			 */
			render: [],
			/**
			 * 请求后
			 */
			after: []
		};

		/**
		 * 路由集合
		 */
		this.routes = {
			post: [],
			get: []
		};

		$.push(server, this, true);
		$.config = init(this.config);

		if (this.config.sys.event && $.event_admin) {
			// 创建一个API事件
			var apis = $.event_admin('api', 'API事件');
			apis.update();
			for (var k in this.events) {
				this.events[k] = apis["list_" + k];
			}
		};

		// WAF（web防火墙）
		waf(server);

		// 引入web socket通讯
		server = websocket(server);

		// 设置session 保存时长2小时
		server.use(session({
			maxAge: 7200
		}));

		if (this.config.sys.websocket && $.Socket) {
			//使用 websocket 服务
			const Socket = $.Socket;
			$.socket = new Socket();
			$.socket.update();
			server.ws.use($.socket.run);
		}

		/**
		 * 路由前后事件
		 */
		server.use(async (ctx, next) => {
			ctx.db = {};
			var db = ctx.db;
			db.ret = null;
			var ret = await this.run_event(ctx, this.events.before, db);
			if (!ret) {
				await next();
				ret = await this.run_event(ctx, this.events.after, db) || db.ret;
			}
			if (ret) {
				ctx.body = ret;
				ctx.status = ctx.status == 404 ? 200 : ctx.status;
			}
		});

		// 使用压缩
		if (this.config.sys.compress) {
			server.use(
				compress({
					filter: function(content_type) {
						// 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
						return /text/i.test(content_type);
					},
					// 阀值，当数据超过1kb的时候，可以压缩
					threshold: 1024,
					// zlib是node的压缩模块
					flush: require('zlib').Z_SYNC_FLUSH
				})
			);
		}

		// 处理静态文件
		if (this.config.sys.static) {
			server.use(statics(
				this.config.path.static, {
					maxAge: 60 * 60 * 24 * 7,
					gzip: true,
					brotli: true
				}));
		}

		// 使用多路径静态文件处理器
		if (this.config.sys.static && $.Static) {
			const Static = $.Static;
			$.static = new Static();
			$.static.update();
			server.use($.static.run);
		}

		// 解析 text/xml
		server.use(xmlParser());

		// 解析 application/json、application/x-www-form-urlencoded、text/plain
		// 接收主体
		server.use(koaBody({
			multipart: true,
			formidable: {
				// 设置上传文件大小最大限制，默认20M
				maxFileSize: 2000 * 1024 * 1024
			}
		}));

		// 追加主程序
		this.main("/*", async (ctx, db) => {
			var md = ctx.method.toLocaleLowerCase();
			var list = this.routes[md];
			return await this.run_route(ctx, db, list);
		});

		// 使用路由(主要)
		server.use(async (ctx, next) => {
			var db = ctx.db;
			var path = ctx.path;
			if (path !== "/favicon.ico") {
				db.ret = await this.run_event(ctx, this.events.check, db);
				if (!db.ret) {
					db.ret = await this.run_event(ctx, this.events.main, db);
				}
				db.ret = await this.run_event(ctx, this.events.render, db) || db.ret;
			}
			if (db.ret) {
				ctx.body = db.ret;
			} else {
				next();
			}
		});
		
		if (this.config.sys.task && $.event_admin) {
			// 创建一个任务管理器
			$.task = $.task_admin('sys');
			$.task.update();
			// 启动计时器
			$.timer.start();
			console.log('已启动定时任务！');
		};
		return server;
	}
}

/**
 * 执行
 * @param {Object} ctx 请求上下文
 * @param {Function} next 跳过当前
 * @param {Array} list 路由列表
 * @param {Object} db 数据管理器
 */
MM.prototype.run_event = async function(ctx, list, db) {
	try {
		var path = ctx.path;
		var method = ctx.method;
		for (var i = 0; i < list.length; i++) {
			var o = list[i];
			var cg = o.config;
			if (cg.method == "ALL" || cg.method == method) {
				if (o.onOff && path.has(cg.target)) {
					var ret = await o.run(ctx, db);
					if (ret) {
						db.ret = ret;
						if (cg.end) {
							break;
						}
					}
				}
			}
		}
	} catch (e) {
		console.log(e);
	}
	return db.ret;
};

/**
 * 执行
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据库管理器
 * @param {Array} list 路由列表
 */
MM.prototype.run_route = async function(ctx, db, list) {
	try {
		if (list) {
			var path = ctx.path;
			for (var i = 0; i < list.length; i++) {
				var o = list[i];
				var cg = o.config;
				if (o.onOff && path.has(cg.path)) {
					var ret = await o.run(ctx, db);
					if (ret) {
						db.ret = ret;
					}
					if (cg.end) {
						break;
					}
				}
			}
		}
	} catch (e) {
		console.log(e);
	}
	return db.ret;
};

/**
 * 新建事件模型
 * @param {Object} obj 附加值
 * @return {Object} 返回模型
 */
MM.prototype.event_model = function(obj, run) {
	return {
		// 开关
		onOff: true,
		// 配置参数
		config: Object.assign({
			// 接受的请求方式
			method: "ALL",
			// 目标
			target: "",
			// 排序
			sort: 100,
			// 结束
			end: true,
		}, obj),
		// 回调函数
		run: run || function(ctx, db) {
			return null;
		}
	};
};

/**
 * 新建路由模型
 * @param {Object} obj 附加值
 * @return {Object} 返回模型
 */
MM.prototype.route_model = function(obj, run) {
	return {
		// 开关
		onOff: true,
		// 配置参数
		config: Object.assign({
			// 接受的请求方式
			method: "GET",
			// 请求路径
			path: "",
			// 排序
			sort: 100,
			// 结束
			end: true,
			// 缓存时长, 单位:分钟
			cache: 0,
			// 缓存方式 client客户端缓存, server服务端缓存
			cache_method: "client server"
		}, obj),
		// 回调函数
		run: run || function(ctx, db) {
			return null;
		}
	};
};

/**
 * 添加post路由
 * @param {String} path 路由路径
 * @param {Function} func 回调函数
 * @param {Number} sort 排列顺序
 */
MM.prototype.post = function(path, run, sort = 100) {
	this.routes["post"].push(this.route_model({
		method: "POST",
		path,
		sort
	}, run));
	this.route_sort('post');
};

/**
 * 添加get路由
 * @param {String} path 路由路径
 * @param {Function} func 回调函数
 * @param {Number} sort 排列顺序
 */
MM.prototype.get = function(path, run, sort = 100) {
	this.routes["get"].push(this.route_model({
		method: "GET",
		path,
		sort
	}, run));
	this.route_sort('get');
};

/**
 * 请求前
 * @param {String} target 目标
 * @param {Function} func 回调函数
 * @param {Number} sort 排列顺序
 */
MM.prototype.before = function(target, run, sort = 100) {
	this.events["before"].push(this.event_model({
		end: false,
		target,
		sort
	}, run));
	this.event_sort('before');
};

/**
 * 请求后
 * @param {String} target 目标
 * @param {Function} func 回调函数
 * @param {Number} sort 排列顺序
 */
MM.prototype.check = function(target, run, sort = 100) {
	this.events["check"].push(this.event_model({
		target,
		sort
	}, run));
	this.event_sort('check');
};

/**
 * 主要
 * @param {String} target 目标
 * @param {Function} func 回调函数
 * @param {Number} sort 排列顺序
 */
MM.prototype.main = function(target, run, sort = 100) {
	this.events["main"].push(this.event_model({
		end: false,
		target,
		sort
	}, run));
	this.event_sort('main');
};

/**
 * 渲染
 * @param {String} target 目标
 * @param {Function} func 回调函数
 * @param {Number} sort 排列顺序
 */
MM.prototype.render = function(target, run, sort = 100) {
	this.events["render"].push(this.event_model({
		target,
		sort
	}, run));
	this.event_sort('render');
};

/**
 * 请求后
 * @param {String} target 目标
 * @param {Function} func 回调函数
 * @param {Number} sort 排列顺序
 */
MM.prototype.after = function(target, run, sort = 100) {
	this.events["after"].push(this.event_model({
		end: false,
		target,
		sort
	}, run));
	this.event_sort('after');
};


/**
 * 路由排序方式
 * @param {Object} obj_a 对象A
 * @param {Object} obj_b 对象B
 */
MM.prototype.route_sort_way = function(obj_a, obj_b) {
	var a = obj_a.config;
	var b = obj_b.config;
	var n = a.sort - b.sort;
	if (n == 0) {
		return b.path.length - a.path.length;
	} else {
		return n;
	}
};

/**
 * 路由排序
 * @param {String} key 排序类型
 */
MM.prototype.route_sort = function(key) {
	if (key) {
		if (this.routes[key]) {
			this.routes[key].sort(this.route_sort_way);
		}
	} else {
		this.routes["post"].sort(this.route_sort_way);
		this.routes["get"].sort(this.route_sort_way);
	}
};

/**
 * 事件排序方式
 * @param {Object} obj_a 对象A
 * @param {Object} obj_b 对象B
 */
MM.prototype.event_sort_way = function(obj_a, obj_b) {
	var a = obj_a.config;
	var b = obj_b.config;
	var n = a.sort - b.sort;
	if (n == 0) {
		return b.target.length - a.target.length;
	} else {
		return n;
	}
};

/**
 * 事件排序
 * @param {String} key 排序类型
 */
MM.prototype.event_sort = function(key) {
	if (key) {
		if (this.events[key]) {
			this.events[key].sort(this.event_sort_way);
		}
	} else {
		this.events["before"].sort(this.event_sort_way);
		this.events["check"].sort(this.event_sort_way);
		this.events["main"].sort(this.event_sort_way);
		this.events["render"].sort(this.event_sort_way);
		this.events["after"].sort(this.event_sort_way);
	}
};

/**
 * 对象转移
 * @param {Array} lt 排序类型
 * @param {Array} list 排序类型
 * @param {String} paths 路径集合
 * @param {String} key 主键
 */
MM.prototype.shift = function(lt, list, paths, key = "target") {
	for (var i = list.length - 1; i >= 0; i--) {
		var o = list[i];
		var p = o.config[key];
		for (var n = 0; n < paths.length; n++) {
			if (p.has(paths[n])) {
				lt.push(o);
				list.splice(i, 1);
			};
		}
	}
};


/**
 * 运行服务
 */
MM.prototype.run_server = function(config) {
	var servers = {};
	// 追加代理服务
	for (var k in config.proxy) {
		var cg = config.proxy[k];
		var p = cg.path;
		var server = new MM(Object.assign({}, config));
		this.shift(server.routes["get"], this.routes["get"], p, "path");
		this.shift(server.routes["post"], this.routes["post"], p, "path");
		this.shift(server.events["before"], this.events["before"], p);
		this.shift(server.events["check"], this.events["check"], p);
		this.shift(server.events["main"], this.events["main"], p);
		this.shift(server.events["render"], this.events["render"], p);
		this.shift(server.events["after"], this.events["after"], p);
		server.call = compose(server.middleware);
		servers[k] = server;
		this.use(servers[k].call);
	}
	this.servers = servers;
};

/**
 * 运行
 * @param {Function} func 回调函数
 */
MM.prototype.run = function(func) {
	// this.run_server(this.config);
	var {
		threads,
		host,
		port
	} = this.config.web;

	if (!func) {
		func = function() {
			$.log.info('启动服务', `访问地址 http://${host}:${port}`);
		}
	}
	
	if(threads == 1){
		this.listen(port, host, func);
	}
	else {
		if (!threads) {
			threads = require('os').cpus().length;
		}
		
		if (cluster.isMaster) {
			for (var i = 0; i < threads; i++) {
				cluster.fork();
			}
			cluster.on('listening', function(worker, address) {});
		} else if (cluster.isWorker) {
			this.listen(port, host, func);
		}
	}
};

/**
 * 排序
 * @param {String} key 排序类型
 */
MM.prototype.sort = function() {
	this.event_sort();
	this.route_sort();
};


module.exports = MM;
