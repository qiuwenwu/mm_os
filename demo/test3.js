const MM = require('./index.js');

var app = new MM();

// 临时缓存结果
var ret_cache;

// 添加请求前事件
app.before('/te*', async (ctx, db) => {
	if (ret_cache) {
		body = ret_cache;
		ret_cache = null;
		return body;
	}
});

// 添加请求后事件
app.after('/te*', async (ctx, db) => {
	if (ctx.ret) {
		ret_cache = ctx.ret;
	}
});

// 添加Get请求
app.get('/te*', async (ctx, db) => {
	var qy = ctx.request.query;
	console.log(qy);
	return "te";
});

// 添加Post请求
app.post('/te*', async (ctx, db) => {
	var qy = ctx.request.query;
	var by = ctx.request.body;
	console.log(qy, by);
	return "te";
});

// 添加Get请求
app.get('/test', async (ctx, db) => {
	ctx.body = "test";
	// ctx.redirect("https://www.baidu.com");
});

app.sort();

app.use(async (ctx, next) => {
	await next();
	if (!ctx.body && ctx.path.has('/t*')) {
		ctx.body = "Hello World!";
	}
});

app.listen(5000, () => {
	var {
		host,
		port
	} = app.config.web;
	$.log.info('启动服务', `访问地址 http://${host}:${port}`);
});
