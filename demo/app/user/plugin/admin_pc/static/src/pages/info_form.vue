<template>
	<main id="user_info_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户信息</h5>
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
				url_submit: "/apis/user/info?",
				url_get_obj: "/apis/user/info",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
						"user_id": 0,
						"sex": 0,
						"idcard_state": 0,
						"age": 0,
						"province_id": 0,
						"city_id": 0,
						"birthday": '',
						"name": '',
						"job": '',
						"school": '',
						"major": '',
						"idcard": '',
						"company_address": '',
						"address": '',
						"job_scope": '',
						"company_business": '',
						"idcard_img": '',
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
