<template>
	<main id="user_info">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>用户信息</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="3">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="姓名" @blur="search()" />
								</mm_col>
								<mm_col>
									<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./info_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id"><span>#</span></th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="性别" v-model="query.orderby" field="sex" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="身份实名认证" v-model="query.orderby" field="idcard_state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_smallint">
										<mm_reverse title="年龄" v-model="query.orderby" field="age" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_int">
										<mm_reverse title="省份ID" v-model="query.orderby" field="province_id" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_int">
										<mm_reverse title="所在城市ID" v-model="query.orderby" field="city_id" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_date">
										<mm_reverse title="生日" v-model="query.orderby" field="birthday" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="姓名" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="职业" v-model="query.orderby" field="job" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="毕业学校" v-model="query.orderby" field="school" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="所学专业" v-model="query.orderby" field="major" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="身份证号" v-model="query.orderby" field="idcard" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="公司地址" v-model="query.orderby" field="company_address" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="详细地址" v-model="query.orderby" field="address" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="工作范围" v-model="query.orderby" field="job_scope" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_varchar">
										<mm_reverse title="公司经营范围" v-model="query.orderby" field="company_business" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_text">
										<mm_reverse title="身份证图片" v-model="query.orderby" field="idcard_img" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle"><span>操作</span></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row"><span>{{ o[field] }}</span></th>
									<td><span class="th_smallint">{{ o.sex }}</span></td>
									<td><span class="th_smallint">{{ o.idcard_state }}</span></td>
									<td><span class="th_smallint">{{ o.age }}</span></td>
									<td><span class="th_int">{{ o.province_id }}</span></td>
									<td><span class="th_int">{{ o.city_id }}</span></td>
									<td><span class="th_date">{{ o.birthday }}</span></td>
									<td><span class="th_varchar">{{ o.name }}</span></td>
									<td><span class="th_varchar">{{ o.job }}</span></td>
									<td><span class="th_varchar">{{ o.school }}</span></td>
									<td><span class="th_varchar">{{ o.major }}</span></td>
									<td><span class="th_varchar">{{ o.idcard }}</span></td>
									<td><span class="th_varchar">{{ o.company_address }}</span></td>
									<td><span class="th_varchar">{{ o.address }}</span></td>
									<td><span class="th_varchar">{{ o.job_scope }}</span></td>
									<td><span class="th_varchar">{{ o.company_business }}</span></td>
									<td><span class="th_text">{{ o.idcard_img }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./info_form?user_id=' + o[field]">修改</mm_btn>
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
				url_get_list: "/apis/user/info",
				url_del: "/apis/user/info?method=del&",
				url_set: "/apis/user/info?method=set&",
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
					//性别——最小值
					'sex_min': 0,
					//性别——最大值
					'sex_max': 0,
					//身份实名认证——最小值
					'idcard_state_min': 0,
					//身份实名认证——最大值
					'idcard_state_max': 0,
					//年龄——最小值
					'age_min': 0,
					//年龄——最大值
					'age_max': 0,
					//生日——开始时间
					'birthday_min': '',
					//生日——结束时间
					'birthday_max': '',
					//姓名
					'name': '',
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
	#user_info {}

	/* 表单 */
	#user_info .mm_form {}

	/* 筛选栏栏 */
	#user_info .mm_filter {}

	/* 操作栏 */
	#user_info .mm_action {}

	/* 模态窗 */
	#user_info .mm_modal {}

	/* 表格 */
	#user_info .mm_table {}

	/* 数据统计 */
	#user_info .mm_data_count {}
</style>
