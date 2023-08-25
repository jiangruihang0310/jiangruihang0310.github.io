<template>
	<div class="start_stop" ref='line'></div>
</template>

<script>
import { onMounted, reactive, toRefs, ref,watch } from 'vue'
import * as echarts from 'echarts'
export default {
	props:{
		grid:{
			type:Object,
			default:()=>{ return {
				left: '10%',
				right: '5%',
				top: '20%',
				bottom: '20%',
			}}
		},
		title:{
			type:String,
			default:()=>'启停信号'
		},
		xAxis:{
			type:Array,
			default:()=>[
					"2023-08-24 00:00:00",
					"2023-08-24 00:01:00",
					"2023-08-24 00:02:00",
					"2023-08-24 00:03:00",
					"2023-08-24 00:04:00",
				]
		},
		data:{
			types:Array,
			default:()=>["0","0","0",'1','1','0']
		},
		width:{
			type:String,
			default:()=>'100%'
		},
		height:{
			type:String,
			default:()=>'100%'
		},
	},
	setup(props) {
		// var dom = document.getElementById("containers");
		const line = ref('')

		var app = {};
		const state = reactive({

		})
		const methods = {
			drawing() {
				var myChart = echarts.init(line.value);
				var colors = ['#21DE73', '#4D7BBD', '#ccc']; //三种状态的颜色
				const datas = props.data.map((item, index) => {
					return {
						name: "设备运行状态",
						itemStyle: {
							color: item == '0' ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(0, 0, 255)'
								},
								{
									offset: 1,
									color: 'rgb(65, 105, 225)'
								}
							]) : item == '1' ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(34, 139, 34)'
								},
								{
									offset: 1,
									color: 'rgb(0, 250, 154)'
								}

							]) : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(169, 169, 169)'
								},
								{
									offset: 1,
									color: 'rgb(128, 128, 128)'
								}
							])

						}, value: [Number(item), props.xAxis[index],props.xAxis[index+1]]
					}
				})
				// echart配置
				var option = {
					title: {
						// text: '当前设备运行状态表',
						left: 'left',
						// top: '%',
						left: '10%'
					},
					color: colors,
					tooltip: {//提示框
						formatter: function (params) {
							const str = params.value[0] == '0' ? "停机" : params.value[0] == '1' ?'启动' : "无信号"
							const color = params.value[0] == '0' ? colors[1] : params.value[0] == '1' ?colors[0] :colors[2]
							return params.value[1] + '<br/>' + params.name + `：<span style='display: inline-block;width:15px;height:15px;background:${color};border-radius:50%;transform: translateY(3px);'></span>` + `<span style='margin-left:5px;display: inline-block;'>${str}</span>`;
						}//数据的值`
					},
					legend: {//图例
						data: ['运行', '停机', '无信号'],
						top: '5%',
						selectedMode: false, // 图例设为不可点击
						textStyle: {
							color: '#000'
						},
						textStyle: {
							color: '#fff'
						}
					},
					grid: {//绘图网格
						left: '10%',
						right: '5%',
						top: '20%',
						bottom: '20%',
						borderWidth: 0
					},
					xAxis: {
						type: 'category',
						scale: true,
						axisLine: {
							lineStyle: {
								show: false,
								color: '#fff'
							}
						},
						axisLabel: {
							// align: 'left', // 将刻度标签居中对齐
							verticalAlign: 'middle' // 垂直居中对齐
						},
						axisTick: {
							show: false,

						},
						splitLine: {
							show: false
						},
						data: props.xAxis
					},
					yAxis: {
						name: '启停信号',
						type: 'value',
						max: 1,
						min: 0,
						minInterval: 1,
						axisLine: {
							show: false,
							lineStyle: {
								show: false,
								color: '#fff',
							}
						},
						axisLabel: {
							show: false,
							// align: 'left', // 将刻度标签居中对齐
							verticalAlign: 'middle' // 垂直居中对齐
						},
						axisTick: {
							show: false,
						},
						splitLine: {
							show: false
						},
						// data: ['启停信号'],
					},
					series: [

						{ name: '运行', type: 'bar', data: [] },
						{ name: '停机', type: 'bar', data: [] },// 用空bar来显示三个图例
						{ name: '无信号', type: 'bar', data: [] },// 用空bar来显示三个图例
						{
							type: 'custom',
							borderWidth: 0,
							labelLayout: () => {
								return { verticalAlign: 'middle' }
							},
							renderItem: function (params, api) {//开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
								var categoryIndex = api.value(0);//这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
								var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
								var end = api.coord([api.value(2), categoryIndex]);
								var height = api.size([0, 1])[1] * 5;
								var containerHeight = api.getHeight(); // 获取容器高度
								var customHeight = 30; // 自定义图形的固定高度
								var yOffset = (containerHeight - customHeight) / 4
								// console.log(api.style), '2222');
								return {
									type: 'rect',// 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。

									align: 'center',
									shape: echarts.graphic.clipRectByRect({ // 矩形的位置和大小。
										x: start[0],
										y: start[1] - height / 2,
										width: end[0] - start[0] +1 ,
										height: height
									}, { // 当前坐标系的包围盒。
										x: params.coordSys.x,
										y: params.coordSys.y + yOffset,
										width: params.coordSys.width,
										height: customHeight,
									}),
									style: api.style(),

								};
							},
							encode: {
								x: [0,1], // data 中『维度1』和『维度2』对应到 X 轴
								y: 0,	// data 中『维度0』对应到 Y 轴

							},
							data: datas
						}
					]
				};
				if (option && typeof option === "object") {
					myChart.setOption(option, true);
				}
			}
		}
		onMounted(() => {
			methods.drawing()
		})
		watch(()=>state.data,(newVal,oldVal)=>{
			if(newVal) {
				methods.drawing()
			}
		})
		return { ...toRefs(state), ...methods, line }
	}
}
</script>

<style lang="scss" scoped>
.start_stop{
	width: 100%;
	height: 100%;
}
</style>