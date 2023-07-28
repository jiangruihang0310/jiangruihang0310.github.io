<template>
	 <el-table
	   :class="className"
	   header-cell-class-name="thead_class" 
	   :highlight-current-row="true"
      :data="tableData"
	  :border="true"
	  >
	  <!-- 判断是否有复选框 -->
      <el-table-column v-if="selection" type="selection" width="55" align="center" />
      <template v-for="(item,index) in column">
		<el-table-column
			align="center"
			v-bind="item">
		</el-table-column>
		<slot v-if="item.slot" :name="item.slot"></slot>
		<!-- 使用插槽，让操作按钮在父组件操作 -->
	  </template>
    </el-table>
</template>

<script>
export default {
	/** 
	 *  tableData  表格数据
	 *  column  表格head配置 // 数据名称等
	 *  selection 判断表格是否有复选框
	 *  className 定义class类名
	*/
	props:{
		tableData:{  // 表格数据 
			type:Array,
			default:()=>[]
		},
		column:{  // 表格配置数组
			type:Array,
			default:()=>[]
		},
		selection:{  // 判断是否有复原
			type:Boolean,
			default:()=>false
		},
		className:{
			type:String,
			default:()=>''
		},

	},
	mounted(){
	}
}
</script>

<style lang="scss">
.thead_class{
	background-color:#ddd!important;
	color: #000;
}
</style>