<template>
	<main id="user_sns">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>社交账户</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="3">
								<mm_col>
									<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./sns_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id"><span>#</span></th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="QQ号" v-model="query.orderby" field="qq" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_tinyint">
										<mm_reverse title="QQ认证" v-model="query.orderby" field="qq_state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="微信号" v-model="query.orderby" field="wechat" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_tinyint">
										<mm_reverse title="微信认证" v-model="query.orderby" field="wechat_state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="MM号" v-model="query.orderby" field="mm" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_tinyint">
										<mm_reverse title="MM认证" v-model="query.orderby" field="mm_state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="百度账号" v-model="query.orderby" field="baidu" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_tinyint">
										<mm_reverse title="百度认证" v-model="query.orderby" field="baidu_state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="淘宝账号" v-model="query.orderby" field="taobao" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_tinyint">
										<mm_reverse title="淘宝认证" v-model="query.orderby" field="taobao_state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row"><span>{{ o[field] }}</span></th>
									<td><span class="th_varchar">{{ o.qq }}</span></td>
									<td><span class="th_tinyint">{{ o.qq_state }}</span></td>
									<td><span class="th_varchar">{{ o.wechat }}</span></td>
									<td><span class="th_tinyint">{{ o.wechat_state }}</span></td>
									<td><span class="th_varchar">{{ o.mm }}</span></td>
									<td><span class="th_tinyint">{{ o.mm_state }}</span></td>
									<td><span class="th_varchar">{{ o.baidu }}</span></td>
									<td><span class="th_tinyint">{{ o.baidu_state }}</span></td>
									<td><span class="th_varchar">{{ o.taobao }}</span></td>
									<td><span class="th_tinyint">{{ o.taobao_state }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./sns_form?user_id=' + o[field]">修改</mm_btn>
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
				url_get_list: "/apis/user/sns",
				url_del: "/apis/user/sns?method=del&",
				url_set: "/apis/user/sns?method=set&",
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
					//QQ认证
					'qq_state': 0,
					//微信认证
					'wechat_state': 0,
					//MM认证
					'mm_state': 0,
					//百度认证
					'baidu_state': 0,
					//淘宝认证
					'taobao_state': 0,
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
	#user_sns {}

	/* 表单 */
	#user_sns .mm_form {}

	/* 筛选栏栏 */
	#user_sns .mm_filter {}

	/* 操作栏 */
	#user_sns .mm_action {}

	/* 模态窗 */
	#user_sns .mm_modal {}

	/* 表格 */
	#user_sns .mm_table {}

	/* 数据统计 */
	#user_sns .mm_data_count {}
</style>
