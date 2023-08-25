<template>
	<div ref="gantt" class="gantt"></div>
</template>

<script>
import { onMounted, ref, reactive, toRefs, watch } from 'vue'
import * as echarts from 'echarts'
export default {
	props: {
		yAxis: {
			type: Array,
			default: () => ['categoryA', 'categoryB', 'categoryC']
		},
		xAxis: {
			type: Number,
			default: () => 
				+new Date("2023-08-24 00:00:00")
			
		},
		types:{
			type:Array,
			default: () =>['A','B','C','D']
		},
		data: {
			type: Array,
			default: () => [
				[{name:'A',value:5423},{name:'B',value:6573},{name:'C',value:4782},{name:'A',value:3298},{name:'B',value:6573},{name:'C',value:4782}],
				[{name:'A',value:3894},{name:'C',value:3217},{name:'B',value:8756},{name:'A',value:3298},{name:'B',value:6573},{name:'C',value:4782}],
				[{name:'C',value:2556},{name:'B',value:2593},{name:'A',value:9782},{name:'A',value:3298},{name:'B',value:6573},{name:'C',value:4782}]
			]
		},
		dataCount: {  // 控制甘特图一列显示几个
			type: Number,
			default: () => 6
		}
	},
	setup(props) {
		const gantt = ref('')
		const state = reactive({
			data: []
		})
		let startTime = new Date(props.xAxis).getTime()
		props.yAxis.forEach(function (category, index) {
			var baseTime = startTime;
			for (var i = 0; i < props.dataCount; i++) {
				if(props.data[index] &&props.data[index][i]){
					var name = props.data[index][i].name
					const color=name ==='A'?'#7b9ce1':name==='B'?'#bd6d6c':'#75d874'
					var duration = props.data[index][i].value
					console.log(duration);
					state.data.push({
					name: name,
					value: [index, baseTime, (baseTime += duration), duration],
					itemStyle: {
						normal: {
						color: color
						}
					}
					});
				}
				baseTime += Math.round(Math.random() * 2000);
			}
			});
		console.log(state.data);
		function renderItem(params, api) {
			var categoryIndex = api.value(0);
			var start = api.coord([api.value(1), categoryIndex]);
			var end = api.coord([api.value(2), categoryIndex]);
			var height = api.size([0, 1])[1] * 0.6;
			var rectShape = echarts.graphic.clipRectByRect(
				{
					x: start[0],
					y: start[1] - height / 2,
					width: end[0] - start[0],
					height: height
				},
				{
					x: params.coordSys.x,
					y: params.coordSys.y,
					width: params.coordSys.width,
					height: params.coordSys.height
				}
			);
			return (
				rectShape && {
					type: 'rect',
					transition: ['shape'],
					shape: rectShape,
					style: api.style()
				}
			);
		}


		const methods = {
			draw() {
				const echart = echarts.init(gantt.value)

				const option = {
					tooltip: {
						formatter: function (params) {
							return params.marker + params.name + ': ' + params.value[3] + ' ms';
						}
					},
					title: {
						text: 'Profile',
						left: 'center'
					},
					dataZoom: [
						{
							type: 'slider',
							filterMode: 'weakFilter',
							showDataShadow: false,
							top: 400,
							labelFormatter: ''
						},
						{
							type: 'inside',
							filterMode: 'weakFilter'
						}
					],
					grid: {
						height: 300
					},
					xAxis: {
						// min: startTime,
						scale: true,
						axisLabel: {
							formatter: function (val) {
								return Math.max(0, val - startTime) + ' ms';
							}
						},
						axisTick: {
							show: false,

						},
						splitLine: {
							show: false
						},
					},
					yAxis: {
						axisTick: {
							show: false,

						},
						splitLine: {
							show: false
						},
						data: props.yAxis
					},
					series: [
						{
							type: 'custom',
							renderItem: renderItem,
							label: {
								show: true,
								position: 'bottom',
								formatter: function (val) {
									console.log(val.value[3])
									return val.value[3] + ' ms';
								},
								textStyle:{
									color:'#fff',
								}
							},
							itemStyle: {
								opacity: 0.8
							},
							encode: {
								x: [1, 2],
								y: 0
							},
							data: state.data
						}
					]
				};
				if (option && typeof option === "object") {
					echart.setOption(option, true);
				}
			}
		}
		onMounted(() => {
			methods.draw()
		})

		return { ...toRefs(state), ...methods, gantt }
	}
}
</script>

<style lang="scss" scoped>
.gantt {
	width: 100%;
	height: 100%;
}
</style>