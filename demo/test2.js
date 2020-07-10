/**
 * 先实例化koa作为参数通过mm实例化, 可以在前面增加中间件
 */
const Koa = require('koa');
const MM = require('./index.js');

var koa = new Koa();

koa.use((ctx, next) => {
	ctx.body = "666";
});

var app = new MM(null, koa);

app.sort();

app.use(async (ctx, next) => {
	await next();
	if (!ctx.body) {
		ctx.body = "Hello World!";
	}
});


app.listen(5000, () => {
	var {
		host,
		port
	} = app.config.web;
	console.log("访问地址为 http://%s:%s", host, port);
});
