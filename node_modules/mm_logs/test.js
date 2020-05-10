require('./index.js');

/**
 * 测试调试输出
 */
async function test() {
	$.log.debug('activity.info.add', [{'nihao': '很好'}], 'nihao', '很好');
	$.log.info('activity.info.del', {'nihao': '很好'}, 'nihao', '很好');
	$.log.warn('activity.info.set', 'nihao', '很好');
	$.log.error('activity.info.get', 'nihao', '很好');
	$.log.success('activity.info.sort', 'nihao', '很好');
}

test();