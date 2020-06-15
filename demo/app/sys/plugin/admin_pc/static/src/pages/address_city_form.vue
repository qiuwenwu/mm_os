<template>
	<main id="sys_address_city_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}城市</h5>
					</header>
					<dl>
						<dt>是否可见</dt>
						<dd>
							<mm_select v-model="form.show" :options="$to_kv(arr_show)" />
						</dd>
						<dt>所属省份</dt>
						<dd>
							<mm_select v-model="form.province_id" :options="$to_kv(list_address_province, 'province_id')" />
						</dd>
						<dt>城市名称</dt>
						<dd>
							<mm_input v-model="form.name" :minlength="0" :maxlength="0" placeholder="" />
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
				url_submit: "/apis/sys/address_city?",
				url_get_obj: "/apis/sys/address_city",
				field: "city_id",
				query: {
					"city_id": 0
				},
				form: {
						"city_id": 0,
						"show": 0,
						"province_id": 0,
						"name": '',
				},
				//是否可见
				'arr_show': ['否','是'],
				//所属省份
				'list_address_province': [],
			}
		},
		methods: {
				/**
				 * 获取所属省份
				 * @param {query} 查询条件
				 */
				get_address_province(query){
					var _this = this;
					this.$get('~/api/sys/address_province?size=0', query, function(json) {
						if (json.result) {
							_this.list_address_province.clear();
							_this.list_address_province.addList(json.result.list)
						}
					});
				},
		},
		created() {
			// 获取所属省份
			this.get_address_province();
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
