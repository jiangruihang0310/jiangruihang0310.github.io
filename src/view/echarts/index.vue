<template>
	<div class="id">
	</div>
</template>

<script>
import Echarts from '@/components/echarts'
import {drawLine,drawBar} from '@/config/charts'
import {mapState} from 'vuex'
export default {
	data(){	
		return {
			drawLine,
			drawBar
		}
	},
	computed:{
		...mapState({
			line1Series:(state)=>state.chartsList.line1Series,
			bar1Series:(state)=>state.chartsList.bar1Series,
		})
	},
	components:{
		Echarts,
	},
	async mounted(){
		// 派发drawLine,仓库生成series数据，生成折线图，全部地址chartsList/SET_CHARTS
		this.$store.dispatch(`${drawLine.model}/${drawLine.name}`,drawLine.type)
		// 派发drawBar,仓库生成series数据，生成柱状图，全部地址chartsList/SET_CHARTS
		this.$store.dispatch(`${drawBar.model}/${drawBar.name}`,drawBar.type)
		console.log(this.bar1Series);

	},
	methods:{
		
	},
	watch:{
	
	}
}
</script>

<style lang="scss" scoped>
	.echats{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.chartsLine
	{
		margin: 10px 0	;
		width: 600px;
		height: 300px;
		background-color:#eee;
	}
	.chartsBar{
		width: 600px;
		height: 400px;
		background-color:#eee ;
	}
</style>