<template>
	<main id="user_group_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户组</h5>
					</header>
					<dl>
						<dt>等级划分</dt>
						<dd>
							<mm_number v-model="form.level" :min="0" :max="1000" />
						</dd>
						<dt>下级用户组ID</dt>
						<dd>
							<mm_input v-model="form.next_group_id" :minlength="0" :maxlength="0" placeholder="决定用户升级后所属用户组" />
						</dd>
						<dt>升级所需经验</dt>
						<dd>
							<mm_number v-model="form.exp" :min="0" :max="2147483647" />
						</dd>
						<dt>折扣</dt>
						<dd>
							<mm_number v-model="form.discount" :min="0" :max="0" />
						</dd>
						<dt>奖励比例</dt>
						<dd>
							<mm_number v-model="form.bonus" :min="0" :max="0" />
						</dd>
						<dt>应用</dt>
						<dd>
							<mm_input v-model="form.app" :minlength="0" :maxlength="0" placeholder="用于区分用户组使用范围，cms内容管理系统、bbs社区、mall商城" />
						</dd>
						<dt>用户名称</dt>
						<dd>
							<mm_input v-model="form.name" :minlength="0" :maxlength="0" placeholder="" />
						</dd>
						<dt>描述</dt>
						<dd>
							<mm_input v-model="form.description" :minlength="0" :maxlength="0" placeholder="描述该用户组的特点或权限范围" />
						</dd>
						<dt>图标</dt>
						<dd>
							<mm_textarea v-model="form.icon" type="text" placeholder="用于标识用户组" />
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
				url_submit: "/apis/user/group?",
				url_get_obj: "/apis/user/group",
				field: "group_id",
				query: {
					"group_id": 0
				},
				form: {
						"group_id": 0,
						"level": 0,
						"next_group_id": 0,
						"exp": 0,
						"discount": 0,
						"bonus": 0,
						"app": '',
						"name": '',
						"description": '',
						"icon": '',
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
