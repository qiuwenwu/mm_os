<template>
	<main id="sys_app_refresh_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}应用刷新</h5>
					</header>
					<dl>
						<dt>用户ID</dt>
						<dd>
							<mm_input v-model="form.user_id" :minlength="0" :maxlength="0" placeholder="表示当前Token绑定的用户uid" />
						</dd>
						<dt>应用ID</dt>
						<dd>
							<mm_input v-model="form.appid" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>刷新令牌</dt>
						<dd>
							<mm_input v-model="form.refresh_token" :minlength="0" :maxlength="0" placeholder="用来刷新访问牌，保留30天" />
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
				url_submit: "/apis/sys/app_refresh?",
				url_get_obj: "/apis/sys/app_refresh",
				field: "refresh_id",
				query: {
					"refresh_id": 0
				},
				form: {
						"refresh_id": 0,
						"user_id": 0,
						"appid": '',
						"refresh_token": '',
				},
			}
		},
		methods: {
		},
		created() {
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
