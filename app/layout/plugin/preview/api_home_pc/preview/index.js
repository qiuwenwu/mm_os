var Dom = require("mm_html");
var tpl = new $.Tpl();
tpl.dir = __dirname.fullname();

$.nodes = {};

var dom = new Dom();
/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var q = req.query;
	var templete = dom.toHtml($.nodes);
	var model = { templete };
	return tpl.view("../../statc/index.html", model);
};

exports.main = main;