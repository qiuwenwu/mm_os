# mm_os
这是超级美眉系统，用于开发web、rpc、websocket函数式编程服务。

## 简介
### 一、研发初衷
目前主流、且好用的开源框架，如下↓
php语言：ThinkPHP、PhalApi、discuz、DedeCMS；    
asp.net core语言：ZKEACMS、Orchard；  
java语言：Sping、Struts2；  
nodejs：egg、nuxt。  
  
以上开源还算比较好用，但是目前还没有一个框架是结合它们的长处来使用的，更没有从中小企业的需求和团队协作方面去考虑而研发的。  
在开发过程中，我们不能因为它们某个框架的特长而就使用某框架来开发，这样不仅学习成本高，而且后期拓展功能容易遇到问题。  
为此，我们最好能有一个具有它们所有优点的一个框架来开发，这样不仅更有利于开发，也更有利于后期维护升级。
我们知道ThinkPHP最大的优点是拓展机制，而

### 二、论高效开发
### 三、研发成果

## 指南
### 一、安装与使用
1.创建目录
```
mkdir example
```
2.进入目录
```
cd example
```
3.初始化项目
```
npm init
```
4.安装mm_os
```
npm i mm_os
```
5.在package.json的"scripts"中加入两行代码
```
"dev": "./node_modules/.bin/cross-env NODE_ENV=development PORT=5000 nodemon server.js"
"start": "./node_modules/.bin/cross-env NODE_ENV=production PORT=5000 node server.js"
```
6.运行开发模式
```
npm run dev
```
7.运行生产模式
```
npm run start
```

### 二、请求与响应
通过restful风格发送post、get请求加上json-rpc2.0作为默认响应数据格式来实现通讯过程。  
请求的数据格式支持xml、form-data、json，接收到的数据会在request.query和request.body中。  
响应支持xml、text、json、html，但建议使用json格式，由于mm_os采用函数式编程，所以可以直接return value来响应请求。  
```javascript
async function main(ctx, db){
	var query = ctx.request.query;
	var body = ctx.request.body;
	return "hello world"
}
module.exports = main;
```
### 二、拓展和规范
### 三、开发和步骤

## SDK
### 一、Mysql SQL数据库
### 二、Redis NoSQL数据库缓存
### 三、mangodb NoSQL数据库持久存储
### 四、expand.js 拓展原型函数
### 五、check.js 参数校验
### 六、http.js 网络请求
### 七、mathch.js 字符串匹配
### 八、html.js 网页数据抓取
### 九、art-template 数据视图渲染

## 机制
### 一、plugin 应用、插件机制
### 二、event 事件、生命周期机制
### 三、api 路由请求机制
### 四、param 参数校验机制
### 五、sql 模板语法机制
### 六、task 定时任务机制
### 七、static 多静态文件管理机制
### 八、websocket 通讯管理机制
### 九、com 公共函数管理机制

## 教程
### 一、创建一个应用
### 二、创建一个插件
### 三、创建一个事件脚本
### 四、创建一个路由接口 helloWorld
### 五、使用mysql增删改查
### 六、使用SQL模板语法功能
### 七、使用参数校验功能
### 八、使用api接口缓存功能
### 九、使用自动生成脚本功能

## 愿景
### 应用愿景
期待mm_os能实现自动化、智能化、可视化开发

### 商业愿景
希望mm_os能帮助更多企业快速实现应用落地计划，提升中小企业创业成功率，抢占市场先机。
