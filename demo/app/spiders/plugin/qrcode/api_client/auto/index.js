var config = {
	"url": "http://www.jinnianduoda.com/group/",
	"pager": ".pageNo",
	"list": ".wechat-lg",
	"view_img": ".page_con .code_pic .p1",
	"view_title": ".code_info .f18",
	"page_index": 1,
	"save_way": "db",
	"save_dir": "./",
	"keywords": "技术"
};

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
	var pm = Object.assign({}, config, q);
	var http = new $.Http();
	http.get(pm.url).then(async(res)=> {
		if(res.body){
			var jq = new $.Html(res.body);
			var list_a = jq(pm.list + " a");
			var pager = jq(pm.pager + " a");
		}
	});
	return "hello world" + JSON.stringify(q);
};

exports.main = main;
