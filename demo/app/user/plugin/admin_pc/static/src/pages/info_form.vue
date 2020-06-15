<template>
	<main id="user_info_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户信息</h5>
					</header>
					<dl>
						<dt>性别</dt>
						<dd>
							<mm_number v-model="form.sex" :min="0" :max="2" />
						</dd>
						<dt>身份实名认证</dt>
						<dd>
							<mm_input v-model="form.idcard_state" :minlength="0" :maxlength="0" placeholder="1为未认证，2为认证中，3为认证通过" />
						</dd>
						<dt>年龄</dt>
						<dd>
							<mm_number v-model="form.age" :min="0" :max="150" />
						</dd>
						<dt>省份ID</dt>
						<dd>
							<mm_input v-model="form.province_id" :minlength="0" :maxlength="0" placeholder="用户所在地的省份" />
						</dd>
						<dt>所在城市ID</dt>
						<dd>
							<mm_input v-model="form.city_id" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>生日</dt>
						<dd>
							<mm_time v-model="form.birthday" type="datetime" />
						</dd>
						<dt>姓名</dt>
						<dd>
							<mm_input v-model="form.name" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>职业</dt>
						<dd>
							<mm_input v-model="form.job" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>毕业学校</dt>
						<dd>
							<mm_input v-model="form.school" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>所学专业</dt>
						<dd>
							<mm_input v-model="form.major" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>身份证号</dt>
						<dd>
							<mm_input v-model="form.idcard" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>公司地址</dt>
						<dd>
							<mm_input v-model="form.company_address" :minlength="0" :maxlength="0" placeholder="用户当前就职的公司地址" />
						</dd>
						<dt>详细地址</dt>
						<dd>
							<mm_input v-model="form.address" :minlength="0" :maxlength="0" placeholder="用户居住地的详细地址" />
						</dd>
						<dt>工作范围</dt>
						<dd>
							<mm_input v-model="form.job_scope" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>公司经营范围</dt>
						<dd>
							<mm_input v-model="form.company_business" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>身份证图片</dt>
						<dd>
							<mm_textarea v-model="form.idcard_img" type="text" placeholder="保存json格式" />
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
