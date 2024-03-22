<template>
	<div class="gantt">
		<div class="title">Click Gantt（可点击甘特图）</div>
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
    return {};
  },
  mounted() {

  },
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