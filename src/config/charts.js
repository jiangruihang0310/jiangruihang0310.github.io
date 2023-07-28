import {chartGradient} from '@/utils/chartGradient'
export const drawLine={
	type:"Line1",
	color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
	title:{
		text:"测试用例_Line_1",
		textStyle:{
			fontSize:15
		},
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
		  type: 'cross',
		  label: {
			backgroundColor: '#6a7985'
		  }
		}
	},
	legend: {
    	data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
  	},
	grid: {
	left: '3%',
	right: '5%',
	bottom: '2%',
	containLabel: true
	},
	xAxis:[{
		type:'category',
		boundaryGap: false,
		data:[]
	}],
	yAxis:[{
		type:'value',
	}],
	model:'chartsList',
	name:'SET_CHARTS',
	series:[]	
}
export const drawBar={
	type:'bar1',
	title:{
		text:'测试用例_Bar_2',
		textStyle:{
			fontSize:15
		}
	},
	tooltip:{
		trigger: 'axis',
	},
	legend:{
		data:['bar 1','bar 2']
	},
	grid: {
		left: '3%',
		right: '5%',
		bottom: '2%',
		containLabel: true
	},
	xAxis:[{
		type: 'value',
		position: 'top',
		splitLine: {
		  lineStyle: {
			type: 'dashed'
		  }
		},
	  }],
	yAxis: [{
		type: 'category',
		axisLine: { show: false },
		axisLabel: { show: false },
		axisTick: { show: false },
		splitLine: { show: false },
	}],
	color:[chartGradient('bar','#000','red'),chartGradient('bar','orange','#000')],
	series:[],
	model:'chartsList',
	name:'SET_CHARTS'
}