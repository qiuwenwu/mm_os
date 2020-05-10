require("mm_logs");
require('mm_tpl');
require("mm_https");
require('mm_crypto');
require('mm_matchs');
require("mm_timer");

$.binPath = __dirname.fullname();
$.html = require('mm_html');
$.redis_admin = require("mm_redis").redis_admin;
$.mongoDB_admin = require("mm_mongodb").mongoDB_admin;
$.mysql_admin = require('mm_mysql').mysql_admin;

/**
 * @param {Object} app
 */
module.exports = function(app) {
	var config = app.config;
	var sys = config.sys;
	// 选择缓存方式,默认memory缓存
	if (sys.cache == 'redis') {
		// 将Api的缓存改为redis方式，如果不用redis可以将以下4行注释掉
		var redis = $.redis_admin('sys');
		redis.setConfig(config.redis);
		redis.open();
		$.cache = redis;
	} else if (sys.cache == 'cache') {
		// 将Api的缓存改为cache方式, 本地缓存方式
		$.cache = $.cache_admin();
	} else if (sys.cache == 'mongodb') {
		// 将Api的缓存改为mongoDB方式
		$.cache = $.mongoDB_admin();
	}

	// 选择数据库
	if (sys.db == 'mysql') {
		$.sql = $.mysql_admin('sys', __dirname);
		$.sql.setConfig(config.mysql);
		$.sql.open();
	}

	return app;
};
