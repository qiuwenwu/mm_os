<template>
	<main id="user_admin">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>管理组</h5>
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
								<mm_btn class="btn_primary-x" url="./admin_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id"><span>#</span></th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="分类" v-model="query.orderby" field="type" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="管理组名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="描述" v-model="query.orderby" field="description" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_text">
										<mm_reverse title="图标" v-model="query.orderby" field="icon" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row"><span>{{ o[field] }}</span></th>
									<td><span class="th_varchar">{{ o.type }}</span></td>
									<td><span class="th_varchar">{{ o.name }}</span></td>
									<td><span class="th_varchar">{{ o.description }}</span></td>
									<td><span class="th_text">{{ o.icon }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./admin_form?admin_id=' + o[field]">修改</mm_btn>
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
				url_get_list: "/apis/user/admin",
				url_del: "/apis/user/admin?method=del&",
				url_set: "/apis/user/admin?method=set&",
				field: "admin_id",
				query_set: {
					"admin_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					//管理组ID
					'admin_id': 0,
					//显示顺序——最小值
					'display_min': 0,
					//显示顺序——最大值
					'display_max': 0,
					//管理组名称
					'name': '',
					//描述
					'description': '',
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
	#user_admin {}

	/* 表单 */
	#user_admin .mm_form {}

	/* 筛选栏栏 */
	#user_admin .mm_filter {}

	/* 操作栏 */
	#user_admin .mm_action {}

	/* 模态窗 */
	#user_admin .mm_modal {}

	/* 表格 */
	#user_admin .mm_table {}

	/* 数据统计 */
	#user_admin .mm_data_count {}
</style>
