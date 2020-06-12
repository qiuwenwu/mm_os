<template>
	<main id="sys_app_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}应用信息</h5>
					</header>
					<dl>
						<dt>是否可用</dt>
						<dd>
							<mm_select v-model="form.available" :options="$to_kv(arr_available)" />
						</dd>
						<dt>加解密方式</dt>
						<dd>
							<mm_select v-model="form.encrypt" :options="$to_kv(arr_encrypt)" />
						</dd>
						<dt>持有者</dt>
						<dd>
							<mm_select v-model="form.user_id" :options="$to_kv(list_account, 'user_id')" />
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
				url_submit: "/apis/sys/app?",
				url_get_obj: "/apis/sys/app",
				field: "app_id",
				query: {
					"app_id": 0
				},
				form: {
						"app_id": 0,
						"available": 0,
						"encrypt": 0,
						"times_allow": 0,
						"times_today": 0,
						"max_age": 0,
						"user_id": 0,
						"times_count": 0,
						"name": '',
						"appid": '',
						"token": '',
						"encoding_aes_key": '',
						"appsecret": '',
						"icon": '',
						"url": '',
						"bind_ip": '',
						"scope": '',
						"scope_not": '',
						"users": '',
				},
				//是否可用
				'arr_available': ['否','是'],
				//加解密方式
				'arr_encrypt': ['','明文模式','兼容模式','安全模式'],
				//持有者
				'list_account': [],
			}
		},
		methods: {
				/**
				 * 获取持有者
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
			// 获取持有者
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
