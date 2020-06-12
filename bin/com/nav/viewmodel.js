/**
 * 视图模型
 * @class
 */
class ViewModel {
	/**
	 * 配置参数
	 * @param {Object} config
	 */
	constructor(config) {

	}
}

/**
 * 获取表格所需键值对
 * @param {Object} model 模型
 * @return {Object} 返回视图所用模型
 */
ViewModel.prototype.field = async function(model) {
	var list = model.param.list;
	if (!list) {
		return [];
	}
	var field;
	if(model.file.indexOf('_form') || model.file.indexOf('_view')){
		field = model.sql.field_obj || '';
	}
	else {
		field = model.sql.field_default || '';
	}
	
	var arr = field.replace(/`/g, '').split(',');
	var pm = [];
	for (var i = 0; i < list.length; i++) {
		var o = list[i];
		var name = o.name;
		if (arr.indexOf(name) !== -1) {
			var obj = {
				name,
				title: o.title,
				type: o.type,
				dataType: o.dataType,
				description: o.description
			};
			var format = model.sql.format.getObj({
				key: name
			});
			if(!format){
				format = model.sql.format.getObj({
					id: name
				});
			}
			if (format) {
				obj.title = format.title;
				obj.format = format;
			}
			pm.push(obj);
		}
	}
	
	return pm;
};

/**
 * 运算视图模型（css）
 * @param {Object} model 模型
 * @return {Object} 返回视图所用模型
 */
ViewModel.prototype.css = async function(model) {
	var css = {};
	return css;
};

/**
 * 运算视图模型（html）
 * @param {Object} model 模型
 * @return {Object} 返回视图所用模型
 */
ViewModel.prototype.html = async function(model) {
	var html = {};
	if (!model.sql) {
		return html;
	}
	return html;
};

/**
 * 运算视图模型（js）
 * @param {Object} model 模型
 * @return {Object} 返回视图所用模型
 */
ViewModel.prototype.js = async function(model) {
	var js = {
		data: [],
		query: []
	};
	var field = model.field;
	// var path_start = model.file.indexOf('admin') !== -1 ? '/apis/' : '/api/';
	
	for (var i = 0; i < field.length; i++) {
		var o = field[i];
		var format = o.format;
		if (format) {
			if (format.table) {
				var basename = format.table.split('_').splice(1).join('_');
				var name = "list_" + basename;
				o.label = name;
				js.data.push({
					basename,
					title: format.title,
					name,
					value: [],
					path: "/api/" + format.table.replace('_', '/') + "?size=0"
				});
			} else {
				var basename = format.key;
				var name = "arr_" + basename;
				o.label = name;
				js.data.push({
					title: format.title,
					name,
					value: format.list
				});
			}
		}
	}
	var param = model.param;
	if (param && param.get) {
		var arr = param.get.query_required.concat(param.get.query);
		var lt = param.list;
		for (var i = 0; i < arr.length; i++) {
			var o = lt.getObj({
				name: arr[i]
			});
			if (o) {
				js.query.push({
					title: o.title,
					name: o.name,
					type: o.type
				});
			}
		}
	}
	return js;
};

/**
 * 运算视图模型
 * @param {Object} model 模型
 * @return {Object} 返回视图所用模型
 */
ViewModel.prototype.run = async function(model) {
	model.field = await this.field(model);
	model.js = await this.js(model);
	model.html = await this.html(model);
	model.css = await this.css(model);
	return model;
};

module.exports = ViewModel;