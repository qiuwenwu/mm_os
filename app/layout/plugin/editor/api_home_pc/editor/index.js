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
	var model = { test: 1123};
	db.tpl.dir = __dirname.fullname();
	var html = db.tpl.view("../../static/templete/index.html", model);
	return html;
};

exports.main = main;