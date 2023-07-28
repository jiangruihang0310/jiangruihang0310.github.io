<template>
	<div :class="$props.className" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	props:{
		className:{
			type:String,
			default:()=>''
		},	
		type:{
			type:String,
			default:()=>''
		},
		tooltip:{
			type:Object||Boolean,
			default:()=>{return {} || false},
		},
		title:{
			type: Object||String,
			default:()=>{return {} || ''}
		},
		legend:{
			type:Object,
			default:()=>{}
		},	
		xColor:{
			type:Array,
			default:()=>[]
		},
		xAxis: {
			type:Array ,
			default:()=>[] 
		},
		yAxis:{
			type:Array,
			default:()=>[]
		},
		seriesData:{
			type:Array,
			default:()=>[]
		},
		grid:{
			type:Object,
			default:()=>{}
		}
		
	},
	data(){
		return {
			option:null
		}
	},
	mounted(){
		this.drawLine()
	},
	methods:{
		drawLine(){
		let myChart=echarts.init(this.$refs.charts)
			let option={
				title:this.$props.title,
				grid:this.$props.grid,
				tooltip:this.$props.tooltip,
				legend:this.$props.legend,
				color:this.$props.xColor,
				series:this.$props.seriesData,
				xAxis:this.$props.xAxis,
				yAxis:this.$props.yAxis
			}
			myChart.clear()
        // 使用刚指定的配置项和数据显示图表。
        	myChart.setOption(option)
        	window.onresize = function () {
          	myChart.resize()
        }
		}
	},
	watch:{
		$props(news,old){
			this.drawLine()
		}
	}
}
</script>

<style>

</style>