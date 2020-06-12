<template>
	<main id="user_account_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户账户</h5>
					</header>
					<dl>
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
				url_submit: "/apis/user/account?",
				url_get_obj: "/apis/user/account",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
						"user_id": 0,
						"state": 0,
						"vip": 0,
						"gm": 0,
						"mc": 0,
						"referee_id": 0,
						"login_time": '',
						"invite_code": '',
						"phone": '',
						"phone_state": 0,
						"username": '',
						"nickname": '',
						"email": '',
						"email_state": 0,
						"user_group": '',
						"user_admin": '',
						"login_ip": '',
						"signature": '',
						"avatar": '',
						"friends": '',
						"admin_group": '',
						"create_time": '',
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
