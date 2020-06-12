<template>
	<main id="${id}">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}${api.title}</h5>
					</header>
					<dl>
						<!--{loop field v idx}-->
							<!--{if(v.format)}-->
						<dt>${v.title}</dt>
								<!--{if(v.format.table)}-->
						<dd>
							<mm_select v-model="form.${v.format.key}" :options="$to_kv(${v.label}, '${v.format.key}')" />
						</dd>
								<!--{else}-->
						<dd>
							<mm_select v-model="form.${v.format.key}" :options="$to_kv(${v.label})" />
						</dd>
								<!--{/if}-->
							<!--{/if}-->
						<!--{/loop}-->
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
				url_submit: "${api.path}?",
				url_get_obj: "${api.path}",
				field: "${sql.key}",
				query: {
					"${sql.key}": 0
				},
				form: {
					/*[loop field v idx]*/
						/*[if v.type === 'number']*/
						"${v.name}": 0,
						/*[else]*/
						"${v.name}": '',
						/*[/if]*/
					/*[/loop]*/
				},
				/*[loop js.data v idx]*/
				// ${ v.title}
				'${v.name}': [/*[loop v.value a idx]*//*[if idx == 0]*/'${a}'/*[else]*/,'${a}'/*[/if]*//*[/loop]*/],
				/*[/loop]*/
			}
		},
		methods: {
			/*[loop js.data v idx]*/
				/*[if(v.path)]*/
				/**
				 * 获取 ${v.title}
				 * @param {query} 查询条件
				 */
				get_/*[v.basename]*/(query){
					var _this = this;
					this.$get('~${v.path}', query, function(json) {
						if (json.result) {
							_this/*['.' + v.name]*/.clear();
							_this/*['.' + v.name]*/.addList(json.result.list)
						}
					});
				},
				/*[/if]*/
			/*[/loop]*/
		},
		created() {
			/*[loop js.data v idx]*/
				/*[if(v.path)]*/
			// 获取 ${v.title}
			this.get_/*[v.basename]*/();
				/*[/if]*/
			/*[/loop]*/
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
