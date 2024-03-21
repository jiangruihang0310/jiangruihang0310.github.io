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
				top: '30%',
				bottom: '20%',
			}}
		},
		title:{ //名称
			type:String,
			default:()=>'启停信号'
		},
		xAxis:{ //默认X轴数据格式
			type:Array,
			default:()=>[
					"2023-08-24 00:00:00",
					"2023-08-24 00:01:00",
					"2023-08-24 00:02:00",
					"2023-08-24 00:03:00",
					"2023-08-24 00:04:00",
				]
		},
		data:{ // 默认启停图数据格式   0代表停止    1代表启动   -1无信号
			types:Array,
			default:()=>["0","1","1",'-1','-1']
		},
		width:{//图表宽度
			type:String,
			default:()=>'100%'
		},
		height:{  // 图表总高度
			type:String,
			default:()=>'100%'
		},
		customHeight:{ // 图表内启停图高度
			type:Number | String,
			default:()=> 30
		}
	},
	setup(props) {
		// var dom = document.getElementById("containers");
		const line = ref('')
		const state = reactive({})
		const methods = {
			drawing() {
				var myChart = echarts.init(line.value);
				var colors = ['#21DE73', '#4D7BBD', '#ccc']; //三种状态的颜色
				const datas = props.data.map((item, index) => {
					return {
						name: "设备运行状态",
						itemStyle: {
							color: item == '0' ? '#4D7BBD': item == '1' ? '#21DE73' : '#ccc'
						}, value: [Number(item), props.xAxis[index],methods.endTime(index)]
					}
				})
				// echart配置
				var option = {
					title: {
						// text: '当前设备运行状态表',
						left: '10%',
						top:'5%'
					},
					color: colors,
					tooltip: {//提示框
						formatter: function (params) {
							const str = params.value[0] == '0' ? "停机" : params.value[0] == '1' ?'启动' : "无信号"
							const color = params.value[0] == '0' ? colors[1] : params.value[0] == '1' ?colors[0] :colors[2]
							return params.value[1] + '<br/>' + params.name + `：<span style='display: inline-block;width:15px;height:15px;background:${color};border-radius:50%;transform: translateY(3px);'></span>` + `<span style='margin-left:5px;display: inline-block;'>${str}</span>`;
						}//数据的值自定义数据格式`
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
						bottom: '10%',
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
							marginTop:5
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
						name: props.title,
						type: 'value',
						max: 1,
						min: 0,
						minInterval: 1,
						axisLine: {
							show: false,
							lineStyle: {
								show: true,
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
								var containerHeight = api.getHeight()/4; // 获取容器高度
								var customHeight = Number(props.customHeight); // 自定义图形的固定高度
								// console.log(api.style), '2222');
								return {
									type: 'rect',// 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
									align: 'center',
									shape: echarts.graphic.clipRectByRect({ // 矩形的位置和大小。
										x: start[0],
										y: start[1] - height / 2,
										width: end[0] - start[0] +.8 ,
										height: height
									}, 
									{ // 当前坐标系的包围盒。
										x: params.coordSys.x,
										y: params.coordSys.y + (containerHeight+customHeight)  ,
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
			},
			endTime(index){
				const arr=props.xAxis
				if(index==props.xAxis.length-1){
					arr.push(methods.getData(new Date(props.xAxis[index]).getTime() + 1000))
					return methods.getData(new Date(props.xAxis[index]).getTime() + 1000)
				}else{
					return props.xAxis[index+1]
				}
			},
			getData(n) {
				let now = new Date(n),
				y = now.getFullYear(),
				m = now.getMonth() + 1,
				d = now.getDate();
				return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
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