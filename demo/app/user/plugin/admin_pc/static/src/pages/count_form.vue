<template>
	<main id="user_count_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户统计</h5>
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
				url_submit: "/apis/user/count?",
				url_get_obj: "/apis/user/count",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
						"user_id": 0,
						"level": 0,
						"iq": 0,
						"credit": 0,
						"credit_points": 0,
						"exp": 0,
						"extcredits1": 0,
						"extcredits2": 0,
						"extcredits3": 0,
						"extcredits4": 0,
						"extcredits5": 0,
						"extcredits6": 0,
						"extcredits7": 0,
						"extcredits8": 0,
						"money": 0,
						"coin": 0,
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
