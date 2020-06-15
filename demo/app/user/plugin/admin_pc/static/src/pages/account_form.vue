<template>
	<main id="user_account_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户账户</h5>
					</header>
					<dl>
						<dt>账户状态</dt>
						<dd>
							<mm_number v-model="form.state" :min="0" :max="10" />
						</dd>
						<dt>会员级别</dt>
						<dd>
							<mm_number v-model="form.vip" :min="0" :max="10" />
						</dd>
						<dt>管理员级别</dt>
						<dd>
							<mm_number v-model="form.gm" :min="0" :max="10" />
						</dd>
						<dt>商家级别</dt>
						<dd>
							<mm_number v-model="form.mc" :min="0" :max="10" />
						</dd>
						<dt>推荐人ID</dt>
						<dd>
							<mm_input v-model="form.referee_id" :minlength="0" :maxlength="0" placeholder="用于推荐注册时积分奖级" />
						</dd>
						<dt>上次登录时间</dt>
						<dd>
							<mm_time v-model="form.login_time" type="datetime" />
						</dd>
						<dt>邀请注册码</dt>
						<dd>
							<mm_input v-model="form.invite_code" :minlength="0" :maxlength="0" placeholder="随着用户注册而生成" />
						</dd>
						<dt>手机号码</dt>
						<dd>
							<mm_input v-model="form.phone" :minlength="0" :maxlength="0" placeholder="用户的手机号码，用于找回密码时或登录时" />
						</dd>
						<dt>手机号码认证</dt>
						<dd>
							<mm_switch v-model="form.phone_state" />
						</dd>
						<dt>用户名</dt>
						<dd>
							<mm_input v-model="form.username" :minlength="0" :maxlength="0" placeholder="用户登录时所用的账户名称" />
						</dd>
						<dt>昵称</dt>
						<dd>
							<mm_input v-model="form.nickname" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>邮箱</dt>
						<dd>
							<mm_input v-model="form.email" :minlength="0" :maxlength="0" placeholder="用户的邮箱，用于找回密码时或登录时" />
						</dd>
						<dt>邮箱认证</dt>
						<dd>
							<mm_switch v-model="form.email_state" />
						</dd>
						<dt>所在用户组</dt>
						<dd>
							<mm_input v-model="form.user_group" :minlength="0" :maxlength="0" placeholder="多个用户组用“,“分隔" />
						</dd>
						<dt>所在管理组</dt>
						<dd>
							<mm_input v-model="form.user_admin" :minlength="0" :maxlength="0" placeholder="多个管理组用“,“分隔" />
						</dd>
						<dt>上次登录时的IP地址</dt>
						<dd>
							<mm_input v-model="form.login_ip" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>个性签名</dt>
						<dd>
							<mm_input v-model="form.signature" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>头像地址</dt>
						<dd>
							<mm_input v-model="form.avatar" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>好友</dt>
						<dd>
							<mm_textarea v-model="form.friends" type="text" placeholder="多个好友ID用“,”分隔" />
						</dd>
						<dt>所在管理组</dt>
						<dd>
							<mm_input v-model="form.admin_group" :minlength="0" :maxlength="0" placeholder="多个管理组用“,“分隔" />
						</dd>
						<dt>创建时间</dt>
						<dd>
							<mm_time v-model="form.create_time" type="datetime" />
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
