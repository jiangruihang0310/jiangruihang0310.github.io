import types from '../typeList'
import {chartGradient} from '@/utils/chartGradient'
import {getLine1,getBar1} from '@/api/https'
import {drawLine} from '@/config/charts'
const state = {
	line1Series:[],
	bar1Series:[]
 };
 const mutations = {
	[types.SET_CHARTS](state,payload){
		if(payload[0]==='Line1'){
			state.line1Series=payload[1]
			drawLine.xAxis[0].data=payload[2]
		}else if(payload[0]==='bar1'){
			// console.log('sssss',payload[1]);
			state.bar1Series=payload[1]
		}
	}
 };
 const actions = {
	async [types.SET_CHARTS]({commit},type){
		let xdata
		let series
		if(type==='Line1'){
		const res=await getLine1()
		xdata=res.data.xdata
		series=[
			{
				name: 'Line 1',
				type: 'line',
				stack: 'line',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color:chartGradient('Line','rgb(128, 255, 165)','rgb(1, 191, 236)') 
				},
				emphasis: {
					focus: 'series'
				},
				data:  res.data.lineData1
				},
				{
				name: 'Line 2',
				type: 'line',
				stack: 'line',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: chartGradient('line','rgb(0, 221, 255)','rgb(77, 119, 255)') 
				},
				emphasis: {
					focus: 'series'
				},
				data:  res.data.lineData1
				},
				{
				name: 'Line 3',
				type: 'line',
				stack: 'line',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color:chartGradient('line','rgb(55, 162, 255)','rgb(116, 21, 219)') 
				},
				emphasis: {
					focus: 'series'
				},
				data:  res.data.lineData3
				},
				{
				name: 'Line 4',
				type: 'line',
				stack: 'line',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: chartGradient('line','rgb(255, 0, 135)','rgb(135, 0, 157)') 
				},
				emphasis: {
					focus: 'series'
				},
				data:  res.data.lineData4
				},
				{
				name: 'Line 5',
				type: 'line',
				stack: 'line',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				label: {
					show: true,
					position: 'top'
				},
				areaStyle: {
					opacity: 0.8,
					color: chartGradient('line','rgb(255, 191, 0)','rgb(224, 62, 76)') 
				},
				emphasis: {
					focus: 'series'
				},
				data: res.data.lineData5
				}
		]
		}
		if(type==='bar1'){
			const res=await getBar1()
			series=[
				{
				  name: 'bar 1',
				  type: 'bar',
				  // stack: 'Total',
				 color:chartGradient('bar','#000','red'),
				  label: {
					show: true,
					// formatter: '{b}'
				  },
				  data: res.data.barData1
				},
				 {
				  name: 'bar 2',
				  type: 'bar',
				  textStyle:{
					color:'#000'
				  },
				  color:chartGradient('bar','orange','#000'),
				  // stack: 'Total',
				  label: {
					show: true,
					// formatter: '{b}'
				  },
				  data:res.data.barData2
				}
			  ]
		}
		commit(types.SET_CHARTS,[type,series,xdata])
	}
 };
 const getters = {
 
 };
 export default {
	namespaced: true,
	 state,
	 mutations,
	 actions,
	 getters
 };
 