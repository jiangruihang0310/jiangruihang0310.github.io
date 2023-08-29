<template>
	<!-- 折线图大大大大大多多多多多多多多多多 -->
	<div class="loading" v-if="prop"></div>
	<div ref="line" class="line"></div>
  </template>
  <script>
  import * as echarts from 'echarts'
  import { onMounted, reactive, toRefs, ref, watch } from 'vue'
  export default {
	props: {
	  airdata: {
		type: Array,
		default: () => {
		  return [{ name: '测试', data: [1, 2, 3, 4, 5, 6] }]
		}
	  },
	  padding: {
		type: Array,
		default: () => {
		  return [0, 0, 0, 20]
		}
	  },
	  fontSize: {
		type: Number,
		default: 12
	  },
	  xdata: {
		type: Array,
		default: () => {
		  return [0, 0, 0, 0]
		}
	  },
	  minmax: {
		type: Boolean,
		default: false
	  },
	  areaStyle: {
		type: Boolean,
		default: false
	  },
	  dataZoom: {
		type: Boolean,
		default: false
	  },
	  unit: {
		type: Boolean,
		default: false
	  },
  
	  linkage: {
		type: Boolean,
		default: false
	  },
	  size: {
		type: Number,
		default: 12
	  },
	  lengthsize: {
		type: Number,
		default: 14
	  },
	  grid: {
		type: Object,
		default: () => {
		  return {
			top: '22% ',
			left: '3%',
			right: '4%',
			height: '70%',
			bottom: '0',
			containLabel: true
		  }
		}
	  },
	  DeviceName: {
		type: String,
		default: ''
	  }
	},
	setup(props) {
	  let line = ref('')
	  const state = reactive({})
	  const methods = {
		drawLine() {
		  // 初始化
		  var myChart = echarts.init(line.value)
		  let colorlist = [
			'#8a2be2',
			'#7fff00',
			'#ff4500',
			'#9acd32',
			'#20b2aa',
			'#ffc0cb',
			'#2f4f4f',
			'#d2b48c',
			'#800000',
			'#00ffff',
			'#4682b4',
			'#ff00ff',
			'#ff1493 ',
			'#20b2aa',
			'#8fbc8b',
			'#9acd32',
			'#008000',
			'#00ff7f',
			'#adff2f',
			'#00008b',
			'#1e90ff',
			'#a52a2a',
			'#d2691e',
			'#bc8f8f',
			'#ff4500',
			'#ff0000',
			'#2f4f4f',
			'#4b0082',
			'#ff00ff',
			'#ff1493',
			'#778899'
		  ]
		  // 配置项
		  let nametitle = ''
		  let series = []
		  props.airdata.forEach((item, index) => {
			nametitle = item.pmortspavg ? item.pmortspavg : item.unit ? '' : '单位:（ug/m3）'
			series.push({
			  name: item.name,
			  type: 'line',
			  data: item.datas || item.val || item.data,
			  color: colorlist[index],
			  smooth: props.minmax ? false : true,
			  symbol: 'none',
			  lineStyle: {
				width: 2
			  }
			})
		  })
  
		  let yAxis
		  if (props.minmax) {
			series.forEach(item => {
			  item.areaStyle = {
				opacity: 0.6,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
				  {
					offset: 0,
					color: 'rgb(128, 255, 165)'
				  },
				  {
					offset: 1,
					color: 'rgb(1, 191, 236)'
				  }
				])
			  }
			  item.lineStyle.color = '#00fa9a'
			})
			yAxis = {
			  name: props.DeviceName ? props.DeviceName : nametitle,
			  type: 'value',
			  min: 0,
			  max: 1,
			  minInterval: 1,
			  splitLine: {
				show: false
			  },
			  axisLabel: {
				//y轴文字的配置
				textStyle: {
				  textShadowBlur: 5,
				  textShadowColor: '#fff'
				}
			  },
			  axisLine: {
				show: false,
				lineStyle: {
				  color: 'rgba(239, 242, 247, 0.974)',
				  textShadowBlur: 5,
				  textShadowColor: '#fff'
				}
			  },
			  nameTextStyle: {
				color: 'rgba(239, 242, 247, 0.974)',
				textShadowBlur: 5,
				fontSize: props.fontSize,
				textShadowColor: '#fff',
				padding: props.padding
			  },
			  splitArea: {
				show: false
			  }
			}
		  } else {
			yAxis = {
			  name: props.DeviceName ? props.DeviceName : nametitle,
			  type: 'value',
			  splitLine: {
				show: false
			  },
			  axisLabel: {
				//y轴文字的配置
				textStyle: {
				  textShadowBlur: 5,
				  textShadowColor: '#fff'
				}
			  },
			  axisLine: {
				show: false,
				lineStyle: {
				  color: 'rgba(239, 242, 247, 0.974)',
				  textShadowBlur: 5,
				  textShadowColor: '#fff'
				}
			  },
			  nameTextStyle: {
				color: 'rgba(239, 242, 247, 0.974)',
				textShadowBlur: 5,
				fontSize: props.fontSize,
				textShadowColor: '#fff',
				padding: props.padding
			  },
			  splitArea: {
				show: false
			  }
			}
		  }
  
		  let option = {
			tooltip: {
			  trigger: 'axis',
			  formatter: props.unit
				? function (params) {
					var relVal = params[0].name
					for (var i = 0, l = params.length; i < l; i++) {
					  relVal +=
						'<br/>' +
						params[i].marker +
						props.airdata[i].name +
						' : ' +
						params[i].value +
						' ' +
						props.airdata[i].unit
					}
					return relVal
				  }
				: ''
			},
			legend: {
			  type: 'scroll',
			  color: [
				'#F58080',
				'#47D8BE',
				'#F9A589',
				'#ff4500',
				'#00ffff',
				'#00bfff',
				'#00bfff',
				'#00bfff',
				'#7fff00',
				'#7fff00',
				'#7fff00',
				'#7fff00',
				'#9acd32',
				'#20b2aa',
				'#20b2aa',
				'#ffc0cb',
				'#ff1493',
				'#ff1493',
				'#ff1493',
				'#8b008b',
				'#ffff00'
			  ],
			  top: '2%',
			  left: 'center',
			  icon: 'circle', //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，等
			  itemWidth: props.size, // 设置宽度
			  itemHeight: props.size, // 设置高度
			  textStyle: {
				color: 'rgba(239, 242, 247, 0.974)',
				fontSize: props.lengthsize,
				TextStyle: {
				  color: 'rgba(239, 242, 247, 0.974)',
				  textShadowBlur: 5,
				  textShadowColor: '#fff'
				}
			  }
			},
			grid: {
			  top: props.grid.top,
			  left: props.grid.left,
			  right: props.grid.right,
			  height: props.grid.height,
			  bottom: props.grid.bottom,
			  containLabel: true
			},
			xAxis: {
			  type: 'category',
			  data: props.xdata,
			  axisLine: {
				lineStyle: {
				  color: 'rgba(239, 242, 247, 0.974)'
				}
			  },
			  axisLabel: {
				//y轴文字的配置
				textStyle: {
				  textShadowBlur: 5,
				  textShadowColor: '#fff'
				}
			  }
			},
			yAxis: yAxis,
			series: series
		  }
  
		  myChart.clear()
		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option)
		  window.onresize = function () {
			myChart.resize()
		  }
		  // myChart.group = 'group_1'
		  if (props.linkage) {
			// echarts.connect('group_1')
		  }
		}
	  }
	  onMounted(() => {
		methods.drawLine()
	  })
  
	  watch(
		props,
		newVal => {
		  if (newVal) {
			// console.log(newVal, 'newval')
			methods.drawLine() //调用ECharts的方法重新绘制
		  }
		},
		{
		  // 被侦听的内容需要是函数的写法 () => stuInfo.friend
		  deep: true
		}
	  )
	  return {
		...toRefs(state),
		...methods,
		line
	  }
	}
  }
  </script>
  
  <style lang="scss" scoped>
  .line {
	width: 100%;
	height: 100%;
  }
  .loading {
	width: 100%;
	height: 100%;
  }
  </style>
  