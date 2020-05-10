/**
 * @fileOverview 日志输出
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
require('mm_expand');
require('colors');
const log4js = require('log4js');

// log4js的输出级别6个: trace, debug, info, warn, error, fatal
log4js.configure({
	// 输出位置的基本信息设置
	appenders: {
		// 设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
		// out: {
		// 	type: 'console'
		// },
		// 设置每天：以日期为单位,数据文件类型，dataFiel   注意设置pattern，alwaysIncludePattern属性
		// allLog: { type: 'dateFile', filename: './log/all', pattern: '-yyyy-MM-dd.log', alwaysIncludePattern: true },
		// 所有日志记录，文件类型file   文件最大值maxLogSize 单位byte (B->KB->M) backups:备份的文件个数最大值,最新数据覆盖旧数据
		allLog: {
			type: 'file',
			filename: './log/output.log'.fullname(),
			keepFileExt: true,
			maxLogSize: 10485760,
			backups: 3
		},
		// http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息 
		httpLog: {
			type: "dateFile",
			filename: "./log/http.log".fullname(),
			pattern: ".yyyy-MM-dd",
			keepFileExt: true
		},
		// 错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
		errorLog: {
			type: 'file',
			filename: './log/error.log'.fullname()
		},
		error: {
			type: "logLevelFilter",
			level: "error",
			appender: 'errorLog'
		}
	},
	// 不同等级的日志追加到不同的输出位置：appenders: ['out', 'allLog']  categories 作为getLogger方法的键名对应
	categories: {
		// appenders:采用的appender, 取上面appenders项, level:设置级别
		http: {
			appenders: ['httpLog'],
			level: "debug"
		},
		default: {
			appenders: ['allLog', 'error'],
			level: 'debug'
		}
	}
});

/**
 * 日志类
 * @class 
 */
class Log {
	/**
	 * @description 构造函数
	 * @constructor
	 */
	constructor() {
		this.logger = log4js.getLogger();
		this.httpLogger = log4js.getLogger('http');
	}
}

/**
 * @description 信息
 * @param {String} tag 日志标签
 * @param {Object} arg 其他要输出的信息
 */
Log.prototype.debug = function(tag, ...arg) {
	console.log(tag, ...arg);
	this.logger.debug(tag, ...arg);
};

/**
 * @description 信息
 * @param {String} tag 日志标签
 * @param {Object} arg 其他要输出的信息
 */
Log.prototype.info = function(tag, ...arg) {
	console.log(tag.blue, ...arg);
	this.logger.info(tag, ...arg);
};

/**
 * @description 信息
 * @param {String} tag 日志标签
 * @param {Object} arg 其他要输出的信息
 */
Log.prototype.warn = function(tag, ...arg) {
	console.log(tag.yellow, ...arg);
	this.logger.warn(tag, ...arg);
};

/**
 * @description 信息
 * @param {String} tag 日志标签
 * @param {Object} arg 其他要输出的信息
 */
Log.prototype.error = function(tag, ...arg) {
	console.log(tag.red, ...arg);
	this.logger.error(tag, ...arg);
};

/**
 * @description 成功
 * @param {String} tag 日志标签
 * @param {Object} arg 其他要输出的信息
 */
Log.prototype.success = function(tag, ...arg) {
	console.log(tag.green, ...arg);
	this.logger.debug(tag, ...arg);
};

$.log = new Log();
exports.Log = Log;
