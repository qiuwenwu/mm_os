<template>
	<main id="sys_address_area_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}地区</h5>
					</header>
					<dl>
						<dt>是否可见</dt>
						<dd>
							<mm_select v-model="form.show" :options="$to_kv(arr_show)" />
						</dd>
						<dt>所属城市</dt>
						<dd>
							<mm_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id')" />
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
				url_submit: "/apis/sys/address_area?",
				url_get_obj: "/apis/sys/address_area",
				field: "area_id",
				query: {
					"area_id": 0
				},
				form: {
						"area_id": 0,
						"show": 0,
						"city_id": 0,
						"name": '',
				},
				//是否可见
				'arr_show': ['否','是'],
				//所属城市
				'list_address_city': [],
			}
		},
		methods: {
				/**
				 * 获取所属城市
				 * @param {query} 查询条件
				 */
				get_address_city(query){
					var _this = this;
					this.$get('~/api/sys/address_city?size=0', query, function(json) {
						if (json.result) {
							_this.list_address_city.clear();
							_this.list_address_city.addList(json.result.list)
						}
					});
				},
		},
		created() {
			// 获取所属城市
			this.get_address_city();
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
