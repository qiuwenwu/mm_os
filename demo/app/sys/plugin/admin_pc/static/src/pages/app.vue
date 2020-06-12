<template>
	<main id="sys_app">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>应用信息</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="3">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="用户名 / 手机号 / 邮箱 / 姓名" @blur="search()" />
								</mm_col>
								<mm_col>
									<mm_select v-model="query.available" title="是否可用" :options="$to_kv(arr_available)" @change="search()" />
								</mm_col>
								<mm_col>
									<mm_select v-model="query.encrypt" title="加解密方式" :options="$to_kv(arr_encrypt)" @change="search()" />
								</mm_col>
								<mm_col>
									<mm_select v-model="query.user_id" title="持有者" :options="$to_kv(list_account, 'user_id')" @change="search()" />
								</mm_col>
								<mm_col>
									<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./app_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id"><span>#</span></th>
									<th scope="col" class="th_tinyint">
										<mm_reverse title="是否可用" v-model="query.orderby" field="available" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="加解密方式" v-model="query.orderby" field="encrypt" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="每日允许请求次数" v-model="query.orderby" field="times_allow" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="今日请求次数" v-model="query.orderby" field="times_today" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="有效期时长" v-model="query.orderby" field="max_age" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_mediumint">
										<mm_reverse title="持有者" v-model="query.orderby" field="user_id" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_int">
										<mm_reverse title="请求总次数" v-model="query.orderby" field="times_count" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="应用名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="应用ID" v-model="query.orderby" field="appid" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="消息访问令牌" v-model="query.orderby" field="token" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="消息加密钥匙" v-model="query.orderby" field="encoding_aes_key" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="应用密钥" v-model="query.orderby" field="appsecret" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_text">
										<mm_reverse title="应用图标" v-model="query.orderby" field="icon" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="消息访问地址" v-model="query.orderby" field="url" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_text">
										<mm_reverse title="访问绑定IP" v-model="query.orderby" field="bind_ip" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_text">
										<mm_reverse title="允许使用的接口" v-model="query.orderby" field="scope" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_text">
										<mm_reverse title="不允许使用的接口" v-model="query.orderby" field="scope_not" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_text">
										<mm_reverse title="授权的用户" v-model="query.orderby" field="users" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row"><span>{{ o[field] }}</span></th>
									<td><span class="th_tinyint">{{arr_available[o.available] }}</span></td>
									<td><span class="th_smallint">{{arr_encrypt[o.encrypt] }}</span></td>
									<td><span class="th_smallint">{{ $to_time(o.times_allow, 'yyyy-MM-dd hh:mm') }}</span></td>
									<td><span class="th_smallint">{{ $to_time(o.times_today, 'yyyy-MM-dd hh:mm') }}</span></td>
									<td><span class="th_smallint">{{ o.max_age }}</span></td>
									<td><span class="th_mediumint">{{ get_name(list_account, o.user_id, 'user_id') }}</span></td>
									<td><span class="th_int">{{ $to_time(o.times_count, 'yyyy-MM-dd hh:mm') }}</span></td>
									<td><span class="th_varchar">{{ o.name }}</span></td>
									<td><span class="th_varchar">{{ o.appid }}</span></td>
									<td><span class="th_varchar">{{ o.token }}</span></td>
									<td><span class="th_varchar">{{ o.encoding_aes_key }}</span></td>
									<td><span class="th_varchar">{{ o.appsecret }}</span></td>
									<td><span class="th_text">{{ o.icon }}</span></td>
									<td><span class="th_varchar">{{ o.url }}</span></td>
									<td><span class="th_text">{{ o.bind_ip }}</span></td>
									<td><span class="th_text">{{ o.scope }}</span></td>
									<td><span class="th_text">{{ o.scope_not }}</span></td>
									<td><span class="th_text">{{ o.users }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./app_form?app_id=' + o[field]">修改</mm_btn>
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
				url_get_list: "/apis/sys/app",
				url_del: "/apis/sys/app?method=del&",
				url_set: "/apis/sys/app?method=set&",
				field: "app_id",
				query_set: {
					"app_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					//应用序号
					'app_id': 0,
					//是否可用
					'available': 0,
					//加解密方式——最小值
					'encrypt_min': 0,
					//加解密方式——最大值
					'encrypt_max': 0,
					//每日允许请求次数——最小值
					'times_allow_min': 0,
					//每日允许请求次数——最大值
					'times_allow_max': 0,
					//今日请求次数——最小值
					'times_today_min': 0,
					//今日请求次数——最大值
					'times_today_max': 0,
					//有效期时长——最小值
					'max_age_min': 0,
					//有效期时长——最大值
					'max_age_max': 0,
					//请求总次数——最小值
					'times_count_min': 0,
					//请求总次数——最大值
					'times_count_max': 0,
					//上次使用时间——开始时间
					'time_update_min': '',
					//上次使用时间——结束时间
					'time_update_max': '',
					//应用名称
					'name': '',
					//关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', 'font_success', 'font_warning', 'font_yellow', 'font_default'],
				//是否可用
				'arr_available': ['否','是'],
				//加解密方式
				'arr_encrypt': ['','明文模式','兼容模式','安全模式'],
				//持有者
				'list_account': [],
				// 视图模型
				vm: {}
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
	#sys_app {}

	/* 表单 */
	#sys_app .mm_form {}

	/* 筛选栏栏 */
	#sys_app .mm_filter {}

	/* 操作栏 */
	#sys_app .mm_action {}

	/* 模态窗 */
	#sys_app .mm_modal {}

	/* 表格 */
	#sys_app .mm_table {}

	/* 数据统计 */
	#sys_app .mm_data_count {}
</style>
