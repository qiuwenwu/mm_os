<template>
	<main id="user_account">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>用户账户</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="3">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="用户名 / 手机号 / 邮箱 / 姓名" @blur="search()" />
								</mm_col>
								<mm_col>
									<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./account_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id"><span>#</span></th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="账户状态" v-model="query.orderby" field="state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="会员级别" v-model="query.orderby" field="vip" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="管理员级别" v-model="query.orderby" field="gm" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="商家级别" v-model="query.orderby" field="mc" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_mediumint">
										<mm_reverse title="推荐人ID" v-model="query.orderby" field="referee_id" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_timestamp">
										<mm_reverse title="上次登录时间" v-model="query.orderby" field="login_time" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="邀请注册码" v-model="query.orderby" field="invite_code" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="手机号码" v-model="query.orderby" field="phone" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_tinyint">
										<mm_reverse title="手机号码认证" v-model="query.orderby" field="phone_state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="用户名" v-model="query.orderby" field="username" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="昵称" v-model="query.orderby" field="nickname" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="邮箱" v-model="query.orderby" field="email" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_tinyint">
										<mm_reverse title="邮箱认证" v-model="query.orderby" field="email_state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="所在用户组" v-model="query.orderby" field="user_group" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="所在管理组" v-model="query.orderby" field="user_admin" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="上次登录时的IP地址" v-model="query.orderby" field="login_ip" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="个性签名" v-model="query.orderby" field="signature" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="头像地址" v-model="query.orderby" field="avatar" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_text">
										<mm_reverse title="好友" v-model="query.orderby" field="friends" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="所在管理组" v-model="query.orderby" field="admin_group" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_datetime">
										<mm_reverse title="创建时间" v-model="query.orderby" field="create_time" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row"><span>{{ o[field] }}</span></th>
									<td><span class="th_smallint">{{ o.state }}</span></td>
									<td><span class="th_smallint">{{ o.vip }}</span></td>
									<td><span class="th_smallint">{{ o.gm }}</span></td>
									<td><span class="th_smallint">{{ o.mc }}</span></td>
									<td><span class="th_mediumint">{{ o.referee_id }}</span></td>
									<td><span class="th_timestamp">{{ $to_time(o.login_time, 'yyyy-MM-dd hh:mm') }}</span></td>
									<td><span class="th_varchar">{{ o.invite_code }}</span></td>
									<td><span class="th_varchar">{{ o.phone }}</span></td>
									<td><span class="th_tinyint">{{ o.phone_state }}</span></td>
									<td><span class="th_varchar">{{ o.username }}</span></td>
									<td><span class="th_varchar">{{ o.nickname }}</span></td>
									<td><span class="th_varchar">{{ o.email }}</span></td>
									<td><span class="th_tinyint">{{ o.email_state }}</span></td>
									<td><span class="th_varchar">{{ o.user_group }}</span></td>
									<td><span class="th_varchar">{{ o.user_admin }}</span></td>
									<td><span class="th_varchar">{{ o.login_ip }}</span></td>
									<td><span class="th_varchar">{{ o.signature }}</span></td>
									<td><span class="th_varchar">{{ o.avatar }}</span></td>
									<td><span class="th_text">{{ o.friends }}</span></td>
									<td><span class="th_varchar">{{ o.admin_group }}</span></td>
									<td><span class="th_datetime">{{ $to_time(o.create_time, 'yyyy-MM-dd hh:mm') }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./account_form?user_id=' + o[field]">修改</mm_btn>
										<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
									</td>
								</tr>
							</tbody>
						</mm_table>
					</mm_body>
					<footer>
						<mm_grid class="mm_data_count">
							<mm_col>
								<mm_select v-model="query.size" :options="$to_size()" @change="search()" />
							</mm_col>
							<mm_col width="50" style="min-width: 22.5rem;">
								<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
							</mm_col>
							<mm_col>
								<div class="right plr">
									<span class="mr">共 {{ count }} 条</span>
									<span>当前</span>
									<input class="pager_now" v-model.number="page_now" @blur="goTo(page_now)" @change="page_change" />
									<span>/{{ page_count }}页</span>
								</div>
							</mm_col>
						</mm_grid>
					</footer>
				</mm_view>
			</mm_col>
		</mm_grid>
		<mm_modal v-model="show" mask="true">
			<mm_view class="card bg_no">
				<header class="bg_white">
					<h5>批量修改</h5>
				</header>
				<mm_body>
					<dl>
					</dl>
				</mm_body>
				<footer>
					<div class="mm_group">
						<button class="btn_default" type="reset" @click="show = false">取消</button>
						<button class="btn_primary" type="button" @click="batchSet()">提交</button>
					</div>
				</footer>
			</mm_view>
		</mm_modal>
	</main>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				// 列表请求地址
				url_get_list: "/apis/user/account",
				url_del: "/apis/user/account?method=del&",
				url_set: "/apis/user/account?method=set&",
				field: "user_id",
				query_set: {
					"user_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					//用户ID
					'user_id': 0,
					//账户状态——最小值
					'state_min': 0,
					//账户状态——最大值
					'state_max': 0,
					//会员级别——最小值
					'vip_min': 0,
					//会员级别——最大值
					'vip_max': 0,
					//管理员级别——最小值
					'gm_min': 0,
					//管理员级别——最大值
					'gm_max': 0,
					//商家级别——最小值
					'mc_min': 0,
					//商家级别——最大值
					'mc_max': 0,
					//上次登录时间——开始时间
					'login_time_min': '',
					//上次登录时间——结束时间
					'login_time_max': '',
					//手机号码认证
					'phone_state': 0,
					//用户名
					'username': '',
					//昵称
					'nickname': '',
					//邮箱认证
					'email_state': 0,
					//创建时间——开始时间
					'create_time_min': '',
					//创建时间——结束时间
					'create_time_max': '',
					//关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', 'font_success', 'font_warning', 'font_yellow', 'font_default'],
				// 视图模型
				vm: {}
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
	#user_account {}

	/* 表单 */
	#user_account .mm_form {}

	/* 筛选栏栏 */
	#user_account .mm_filter {}

	/* 操作栏 */
	#user_account .mm_action {}

	/* 模态窗 */
	#user_account .mm_modal {}

	/* 表格 */
	#user_account .mm_table {}

	/* 数据统计 */
	#user_account .mm_data_count {}
</style>
