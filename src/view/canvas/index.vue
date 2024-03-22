<template>
	<div>
	   <!-- 操作栏 -->
	   <!-- <div class="typeBox">
		  <div v-for="(item, index) in typeList" :key="index" :class="currentType == index ? ['currentType','type'] : 'type'" @click="clickType(index)">
			  {{item.text}}
		  </div>
	   </div> -->
	   <div class="dataBox" v-if='currentType'>
		  <!-- 月日历栏 -->
		  <calendarData></calendarData>
		</div>
		<!-- <div class="monthBox" v-else> -->
		  <!-- 年月份栏 -->
		  <!-- <calendarMonth @changeYear="changeYear"></calendarMonth> -->
		<!-- </div> -->
	</div>
  </template>
  
  <script>
  // 日历组件
  import CalendarData from '@/components/CalendarData/index.vue'
  // 月份组件
//   import CalendarMonth from '@/components/CalendarMonth/index.vue'
  export default {
	components: {
	  calendarData: CalendarData,
	//   calendarMonth: CalendarMonth
	},
	data() {
	  return {
		typeList: [
		  {text: '年'},
		  {text: '月'}
		],
		currentType: 1,
	  }
	},
	created() {},
	methods: {
	  // 修改年
	  changeYear (value) {
		console.log('value', value)
	  },
	  clickType (index) {
		this.currentType = index
	  }
	}
  }
  </script>
  <style lang="scss" scoped>
  .typeBox {
	  display: flex;
	  align-items: center;
	  margin: 15px 0;
	  .type {
		  width: 40px;
		  height: 30px;
		  line-height: 30px;
		  font-size: 16px;
		  margin-right: 5px;
		  border-radius: 5px;
		  text-align: center;
		  background-color: rgb(220, 245, 253);
	  }
	  .currentType {
		  background-color: rgb(169, 225, 243);
	  }
  }
  .dataBox, .monthBox{
	margin-top: 20px;
  }
  </style>
  