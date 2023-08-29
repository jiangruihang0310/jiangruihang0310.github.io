<template>
	<div ref="bar"></div>
</template>

<script>
import {ref,onMounted,watch,toRefs,reactive} from 'vue'
import * as echarts from 'echarts'
export default {
	props:{
		xAxis:{
			type:Array,
			default:()=>[]
		},
		data:{
			type:Array,
			default:()=>[],
		},
		unit:{
			type:String,
			default:()=>''
		},
	},
	setup(props){
		const bar=ref('')
		const state=reactive({})
		let series=[]
		const methods={
			drawBar(){
				const myChart=echarts.init(bar.value)
				
			}
		}
		watch(props.data,(newVal)=>{
			if(newVal){
				methods.drawBar()
			}
		})
		return {...toRefs(state),...methods,bar}
	}
}
</script>

<style>

</style>