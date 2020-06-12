<template>
	<main id="number_info_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}号码信息</h5>
					</header>
					<dl>
						<dt>是否私有</dt>
						<dd>
							<mm_select v-model="form.private" :options="$to_kv(arr_private)" />
						</dd>
						<dt>是否合约号</dt>
						<dd>
							<mm_select v-model="form.heYue" :options="$to_kv(arr_heYue)" />
						</dd>
						<dt>是否隐藏</dt>
						<dd>
							<mm_select v-model="form.hide" :options="$to_kv(arr_hide)" />
						</dd>
						<dt>号码种类</dt>
						<dd>
							<mm_select v-model="form.kid" :options="$to_kv(arr_kid)" />
						</dd>
						<dt>制式</dt>
						<dd>
							<mm_select v-model="form.sid" :options="$to_kv(arr_sid)" />
						</dd>
						<dt>处理人</dt>
						<dd>
							<mm_select v-model="form.uid" :options="$to_kv(list_account, 'uid')" />
						</dd>
						<dt>订单状态</dt>
						<dd>
							<mm_select v-model="form.order" :options="$to_kv(arr_order)" />
						</dd>
					</dl>
					<footer>
						<div class="mm_group">
							<button class="btn_default" type="button" @click="cancel">取消</button>
							<button class="btn_primary" type="button" @click="submit()">提交</button>
						</div>
					</footer>
				</mm_form>
			</mm_col>
		</mm_grid>
	</main>
</template>


<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_submit: "/apis/number/info?",
				url_get_obj: "/apis/number/info",
				field: "number_id",
				query: {
					"number_id": 0
				},
				form: {
						"number_id": 0,
						"private": 0,
						"heYue": 0,
						"hide": 0,
						"kid": 0,
						"yid": 0,
						"tid": 0,
						"cityID": 0,
						"gid": 0,
						"sid": 0,
						"uid": 0,
						"rid": 0,
						"average": 0,
						"score": 0,
						"huaFei": 0,
						"maiJia": 0,
						"daiLiJia": 0,
						"diJia": 0,
						"order": 0,
						"hot": 0,
						"collection": 0,
						"createTime": '',
						"topTime": '',
						"updateTime": '',
						"number": '',
						"format": '',
						"activity": '',
						"group": '',
						"desc": '',
						"diXiao": '',
						"log": '',
						"note": '',
				},
				//是否私有
				'arr_private': ['否','是'],
				//是否合约号
				'arr_heYue': ['否','是'],
				//是否隐藏
				'arr_hide': ['否','是'],
				//号码种类
				'arr_kid': ['','手机号码','固定电话号码','企业电话号码','QQ号码','车牌号码'],
				//制式
				'arr_sid': ['','移动','联通','电信'],
				//处理人
				'list_account': [],
				//订单状态
				'arr_order': ['','待售中','已预约','已售出','已下架','已删除'],
			}
		},
		methods: {
				/**
				 * 获取处理人
				 * @param {query} 查询条件
				 */
				get_account(query){
					var _this = this;
					this.$get('~/api/user/account?size=0', query, function(json) {
						if (json.result) {
							_this.list_account.clear();
							_this.list_account.addList(json.result.list)
						}
					});
				},
		},
		created() {
			// 获取处理人
			this.get_account();
		}
	}
</script>

<style>
	/* 页面 */
	#$ {
		id
	}

		{}

	/* 表单 */
	#$ {
		id
	}

	.mm_form {}

	/* 筛选栏栏 */
	#$ {
		id
	}

	.mm_filter {}

	/* 操作栏 */
	#$ {
		id
	}

	.mm_action {}

	/* 模态窗 */
	#$ {
		id
	}

	.mm_modal {}

	/* 表格 */
	#$ {
		id
	}

	.mm_table {}

	/* 数据统计 */
	#$ {
		id
	}

	.mm_data_count {}
</style>
