# mm_os
这是超级美眉系统，用于开发web、rpc、websocket函数式编程服务。

## 简介
### 一、研发背景
目前主流、且好用的开源框架，如下↓  
php语言：ThinkPHP、PhalApi、discuz、DedeCMS；    
asp.net core语言：ZKEACMS、Orchard；  
java语言：Sping、Struts2；  
nodejs：egg、nuxt。  
  
以上开源还算比较好用，但是目前还没有一个框架是结合它们的长处来使用的，更没有从中小企业的需求和团队协作方面去考虑而研发的。  
在开发过程中，我们不能因为它们某个框架的特长而就使用某框架来开发，这样不仅学习成本高，而且后期拓展功能容易遇到问题。  
为此，我们最好能有一个具有它们所有优点的一个框架来开发，这样不仅更有利于开发，也更有利于后期维护升级。

### 二、论高效开发
我们知道以上主流开源框架都算得上是顶尖的，也是被广大开发者所接受的，但是对于使用，我们就必须要清楚它们的优点在哪里，这样才更有利于我们二次开发。
具有我所知，ThinkPHP最大的优点是拓展机制，而PhalApi开创了服务端的ADM模式（api、domain、model），discuz则具有强大的分类信息功能和最容易上手的模板引擎，DedeCMS则让仅会html的的菜鸟程序员也能开发模板，完成cms。  
而ZKEACMS则拥有强大的拖拽排版功能，Orchard则采用了插件化解决了动态类库引用耦合问题。  
Sping则提供了API解决了上传、电子邮件等问题，Struts2则在数据拦截器和异常处理上做得比较好。  
egg则设计了更灵活得插件机制，让功能拓展更加简便。nuxt则采用了MVVM模式让前端开发分工更加明确、简单。  
当我们看到了这些，是否不由自主的在想，要是它们的长处都能结合起来使用就好了？但是问题来了，如何才能结合这些长处？结合这些长处之后，又如何能保证这个全新的东西更加好用，而不是不伦不类？  
  
### 三、研发成果
在经过两年的时间，对各大主流的框架代码和运作模式进行研究和模仿，mm_os终于诞生了。  
采用了koa做为web服务核心，再加上mm中间件，实现了Sping、Struts2具有的优点。  
采用了应用+插件机制，实现了Orchard、egg具有的优点，同时以操作系统的角度考虑，实现零度耦合（可断、可连）。  
然后在ADM模式基础上升级为ACDM模式（api、check、domain、model）,实现了PhalApi的优点。  
采用了art-template模板引擎进行改进，实现了类似discuz的模板语法。  
采用懒加载com组件，实现了比ThinkPHP更方便的拓展机制。  
除此之外，还参考了nuxt，给服务端设计了生命周期和事件机制，让拓展业务逻辑更加轻巧、简单。  
  
### 四、全新优点
除了学习了各大主流框架的好外，mm_os还考虑了性能、负载、安全性等相关问题，为中小企业打造一个真正企业级的服务端系统。
更为广大开发者提供了很多便捷函数和可超10人以上同时协作开发的架构，这是其他框架没有考虑的问题。  
再加上模型生成数据库、数据库生成模型，脚本自动生成脚本等理念设计，大大提高开发效率，为开发者升级和创造提升到另一个高度。  
  
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
mm_os将一个业务划分成两部分，一部分叫配置，一部分叫服务。  
为了方便区分，保存配置的是json文件，保存服务程序的是js文件，一个业务就由一个json和一个js组成，如果js是常规通用的，那么就可能只有一个配置json，启动后动态继承js。  

### 三、开发和步骤
1.设计数据库  
2.创建应用和插件  
3.使用命令自动生成接口、脚本和开发文档  
4.使用命令生成基本后台页面  
5.修改页面完成后台功能  
6.调整参数校验配置和SQL模板配置  
7.调整API接口配置完成开发  
  
## SDK
### 一、Mysql SQL数据库
1. 使用object对象进行增删改查  
2. 使用sql语句进行增删改查  
3. 使用sql模板语法进行增删改查  
4. 使用共鸣model对数据库进行修改  

### 二、Redis NoSQL数据库缓存
1. 使用增删改查函数  
2. 修改缓存时长  
3. 根据规律删除缓存  
4. 使用消息订阅和通知功能  

### 三、mangodb NoSQL数据库持久存储
1. 使用增删改查函数  
2. 使用object对象增删改查  

### 四、expand.js 拓展原型函数
1. 使用array原型函数  
2. 使用string原型函数  
3. 使用number原型函数  
4. 使用date原型函数  
5. 使用object便捷函数  

### 五、check.js 参数校验
1. 使用check校验入参  
2. 修改check错误提示  

### 六、http.js 网络请求
1. 使用http帮助类做get请求  
2. 使用http帮助类做post请求  
3. 使用http上传文件  
4. 使用http下载文件  

### 七、mathch.js 字符串匹配
1. 使用mathch格式匹配字符串  
2. 使用正则加格式匹配字符串  
3. 使用相似度匹配字符串  

### 八、html.js 网页数据抓取
1. 使用类似jquery方式提取html、text  
2. 使用类似jquery方式网抓取网页中添加数据  

### 九、art-template 视图渲染
1. 使用类似discuz模板语法渲染数据  
2. 使用mvc模式开发网站  

## 机制
### 一、plugin 应用、插件机制
1. 给应用创建插件功能  
3. 利用插件管理事件和API接口  
2. 使用插件命令管理插件  

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

### 开发愿景
希望能帮助开发者提高开发效率，同时也希望更多的开发者能一起打造更出更好的mm_os来帮助企业成长。
