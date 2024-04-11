<template>
	<div class="item">
		<!-- <img src="@/assets/biglogo.png"/> -->
		<el-table :data="tableData" border class="top" :header-cell-style="{ background: '#eee', color: '#000000' }">
			<el-table-column prop="name" label="姓名" show-overflow-tooltip :tooltip=true>
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
			<el-table-column prop="date" label="时间">
			</el-table-column>
		</el-table>
		<vue-seamless-scroll :data="tableData" :class-option="classOption" class="seamless-warp">
			<el-table :data="tableData" border class="bottom" :header-cell-style="{ background: '#eee', color: '#000000' }">
				<el-table-column prop="name" label="姓名" :tooltip=true  show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="address" label="地址">
				</el-table-column>
				<el-table-column prop="date" label="时间">
				</el-table-column>
			</el-table>
		</vue-seamless-scroll>
	</div>
</template>

<script>
import MyTable from "@/components/MyTable";
import MyFrom from "@/components/MyFrom";
export default {
	components: { MyTable, MyFrom },
	data() {
		return {
			formParams: {
				address: "",
				level: "",
				select: '',
				daterange: ''
			},
			formDataList: [
				{
					label: "地区地址",
					prop: "address",
					type: "input",
					placeholder: "请输入地区",
					//   rules: [{ required: true }],
				},
				{
					label: "水平",
					prop: "level",
					placeholder: "请输入水平",
					type: "input",

				},
				{
					label: "选择标准",
					prop: "select",
					placeholder: "请选择",
					options: [
						{
							label: "优秀",
							value: "1",
						},
						{
							label: "良好",
							value: "2",
						},
						{
							label: "差",
							value: "3",
						},
					],
					type: "select",
				},
				{
					label: '时间选择',
					prop: 'daterange',
					type: "daterange"
				}
			],
			formConfig: {
				// labelWidth: "100px",
				inline: true,
				ref: "formRef",
				labelPosition: "right",
			},

			// table
			column: [
				{
					prop: "name",
					label: "姓名",
					tooltip:true,
					width: "",
				},
				{
					prop: "date",
					label: "日期",
					width: "",
					tooltip:true

				},
				{
					prop: "address",
					label: "地址",
					width: "",
				},
				{
					prop: "zip",
					label: "邮政编号",
					width: "",
				},
				{
					slot: "status",
				},
				{
					slot: "opt",
				},
			],
			tableData: [
				{
					name: "小A",
					address: "河北省邯郸市大名县",
					date: "2023-3-17",
					zip: "0310",
					status: "0",
				},
				{
					name: "小H",
					address: "北京市海淀区清河街道燕尚园",
					date: "2023-3-17",
					zip: "0310",
					status: "1",
				},
				{
					name: "小R",
					address: "北京市海淀区清河街道燕尚园",
					date: "2023-3-17",
					zip: "0310",
					status: "1",
				},
				{
					name: "小R",
					address: "北京市海淀区清河街道燕尚园",
					date: "2023-3-17",
					zip: "0310",
					status: "1",
				},

				{
					name: "小R",
					address: "北京市海淀区清河街道燕尚园",
					date: "2023-3-17",
					zip: "0310",
					status: "1",
				},

				{
					name: "小R",
					address: "北京市海淀区清河街道燕尚园",
					date: "2023-3-17",
					zip: "0310",
					status: "1",
				},

				{
					name: "小R",
					address: "北京市海淀区清河街道燕尚园",
					date: "2023-3-17",
					zip: "0310",
					status: "1",
				},

				{
					name: "小R",
					address: "北京市海淀区清河街道燕尚园",
					date: "2023-3-17",
					zip: "0310",
					status: "1",
				},

				{
					name: "小R",
					address: "北京市海淀区清河街道燕尚园",
					date: "2023-3-17",
					zip: "0310",
					status: "1",
				},


			],
			Interval:null
		};
	},
	computed: {
		classOption() {
			return {
				step: 2, // 数值越大速度滚动越快
				limitMoveNum: this.tableData.length, // 开始无缝滚动的数据量 this.tableList
				hoverStop: true, // 是否开启鼠标悬停stop
				direction: 1, // 0向下 1向上 2向左 3向右
				openWatch: true, // 开启数据实时监控刷新dom
				singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
				singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
				waitTime: 0 // 单步运动停止的时间(默认值1000ms)
			}
		}
	},
	mounted(){
		window.addEventListener('progress',this.handleProgress,false)
	},
	methods: {
		//form表单部分
		resetInfo() {
			this.formParams = {};
		},
		commitData() {
			// 这样就可以获取子组件中的表单数据啦
			this.$refs[this.formConfig.ref].transferData().then((date) => {
				console.log(date);
			});
		},
		handleProgress(e){
			console.log(e,'eeeeeeeeeeeeeeeeee');
		},
		//table
		getTableItem(row) {
			console.log(row);
		},
		setStatus(scope) {
			this.$confirm("确定改变状态吗？")
				.then((res) => {
					this.$message.success("修改成功");
				})
				.catch(() => {
					scope.row.status = scope.row.status === "0" ? "1" : "0";
					this.$message.error("修改失败");
				});
			// scope.row.status=row.status==='0'?'1':'0'
		},
	},
};
</script>

<style lang="scss" scoped>
.item{
	width: 100%;
}
ul,
li,
ol {
	padding: 0;
}

.seamless-warp {
	height: 500px;
	width: 100%;
	overflow: hidden;
}

::v-deep .table-style {
	.el-table__header-wrapper {
		display: none;
	}
}

::v-deep .top {
	.el-table__body-wrapper {
		display: none;
	}
}

::v-deep .bottom {
	.el-table__header-wrapper {
		display: none;
	}
}
</style>