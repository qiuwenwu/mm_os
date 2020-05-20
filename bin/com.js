/**
 * 公共类
 */
class Com {
	/**
	 * 构造函数
	 * @param {Object} config
	 * @param {Object} src 载入源
	 */
	constructor(config, src) {
		/**
		 * 配置参数
		 */
		this.config = {
			/**
			 * 检索的起始目录
			 */
			path: __dirname,
			/**
			 * 检索的目录名
			 */
			dir: "com",
			/**
			 * 检索的文件名
			 */
			file: "index.js"
		};

		$.push(this.config, config, true);
		
		/**
		 * 加载模块
		 * @param {String} file 文件全名
		 */
		this.load = function(file) {
			var com = require(file);
			$.push(src, com, true);
		};
		
		/**
		 * 运行com加载
		 * @param {String} path 路径
		 */
		this.run = function(path) {
			if (!path) {
				path = this.config.path.fullname();
			}
			var dir_com = $.dir.getAll(path, this.config.dir);
			
			var dirs = [];
			dir_com.map(function(d){
				var list = $.dir.get(d);
				dirs.addList(list);
			});
			// console.log(dirs);
			// 遍历目录路径
			var _this = this;
			var file = this.config.file;
			dirs.map(function(d) {
				_this.load(d + file);
			});
		};
	}
}

/**
 * 卸载模块
 * @param {String} file 文件全名
 */
Com.prototype.unload = function(file) {
	delete require.cache[require.resolve(file)];
};

module.exports = Com;
