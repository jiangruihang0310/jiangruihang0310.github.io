<template>
	<div class="gantt">
		<div class="title" @click="open">Click Gantt（可点击甘特图）</div>
		<div class="" @click="close">关闭定时器</div>
	  <div id="gstc">
		<Gantt/>
	</div>
  </div>
</template>

<script>
import Gantt from '@/components/gantt'
export default {
	components:{
		Gantt
	},
  data() {
    return {
		flag:false,
		
	};
  },
  mounted() {

  },
  methods:{
	close(){
		this.flag=false
		console.log('点击关闭');
		window.clearInterval(this.Interval)
	},
	open(){
		console.log('点击');
		this.flag=true
		this.Interval=window.setInterval(()=>{
			console.log('定时器启动');
		},10000)
		setTimeout(()=>{
			this.Interval=window.setInterval(()=>{
				console.log('定时器启动');
			},10000)
		},5000)
	}
  }
};
</script>

<style lang="scss" scoped>
.gantt{
	font-family:'Odibee Sans' !important;
	width: 100%;
	height: 100%;
}
#gstc{
	width: 100%;
	height:calc(100% - 80px);
}
.title{
	font-family:'Odibee Sans' !important;
	text-align: center;
	font-weight: 600;
	font-size: 24px;
	margin: 10px 0;
}
</style>