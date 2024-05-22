<template>
	<div class="date-page">
	  <div class="date-header">
		  <div class="year">
			<div name="arrow-left" @click="preMonthClick()" >上一月</div>
			  <span>{{year}} 年 {{month}} 月</span>
			<div name="arrow" @click="nextMonthClick()" >下一月</div>
		  </div>
	  </div>
	  <div class="date-content">
		<div class="weekList">
			<div class="week" v-for="item in weekList" :key="item">{{ item }}</div>
		</div>
		<div class="dataList">
		  <div
			:class="showDay.data &&isActive.data == showDay.data && isActive.year == showDay.year && isActive.month == showDay.month? 'dateActive data': 'data'"
			v-for="(showDay, index) in showData"
			:key="index"
			@click="detailClick(showDay,index)"
			>
			<div class="days" @click="clickDay(showDay)">
				<div class="contentDay">{{ showDay.data }}</div>
				<div class="contentDes" v-if="showDay.data">描述内容</div>
			</div>
			</div>
		</div>
	  </div>
	</div>
  </template>
  <script>
  export default {
	name:'CalendarData',
	data() {
	  return {
		year: "",
		month: "",
		today: "",
		showData: [],
		isActive: {},
		show: false,
		weekList: ['日','一', '二', '三', '四', '五', '六']
	  };
	},
	created() {
	 this.getToday()
	},
	methods: {
	  // 获取当前日期
	   getToday() {
		let date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.today = date.getDate();//获取这是周几
		//初始化数据
		this.getMonthDays(this.year, this.month - 1);
		//得到当月今天的位置index
		this.isActive = {
		  data : this.today,
		  year: this.year,
		  month: this.month
		}
	  },
	  // 上一月
	   preMonthClick() {
		this.show = true;
		if (this.month === 1) {
		  this.month = 12;
		  this.year = this.year - 1;
		} else {
		  this.month = this.month - 1;
		}
		this.getMonthDays(this.year, this.month - 1);
	  },
	  // 下一月
	 nextMonthClick() {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		if (this.year == year) {
		  this.month = this.month + 1;
		  if (this.month < month) {
			this.show = true;
		  } else {
			this.show = false;
			this.getMonthDays(this.year, this.month - 1);
		  }
		} else if (this.year < year) {
		  this.show = true;
		  if (this.month === 12) {
			this.month = 1;
			this.year = this.year + 1;
		  } else {
			this.month = this.month + 1;
		  }
		}
		this.getMonthDays(this.year, this.month - 1);
	  },
	  // 获取日期数组
	  getMonthDays(year, month) {
		// 定义每个月的天数，如果是闰年第二月改为29天
		let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		  daysInMonth[1] = 29;
		}
		// 当月第一天为周几
		let targetDay = new Date(year, month, 1).getDay();
		let calendarDateList = [];
		let preNum = targetDay;
		let nextNum = 0;
		if (targetDay > 0) {
		  // 当前月份1号前的自然周剩余日期，置空
		  for (let i = 0; i < preNum; i++) {
			calendarDateList.push({data: "", year: this.year, month: this.month});
		  }
		}
		for (let i = 0; i < daysInMonth[month]; i++) {
		  // 正常显示的日期
		  calendarDateList.push({data: i + 1, year: this.year, month: this.month})
		}
		// 当前月份最后一天的自然周剩余日期，置空
		nextNum = 6 - new Date(year, month + 1, 0).getDay(); 
		for (let i = 0; i < nextNum; i++) {
		  calendarDateList.push({data: "", year: this.year, month: this.month});
		}
		this.showData = calendarDateList;
		// console.log(this.showData,'...........');
	  },
	  // 当前点击日期
	  detailClick (showData, index) {
		if(showData!==''){
			this.isActive = {...showData}
		}
	  },
	  clickDay(date){
		// console.log(date,'123');
	  }
	  
	}
  }
  </script>
  <style lang="scss" scoped>
  .year {
	font-weight: 700;
	font-size: 18px;
  }
  
  .weekList {
	display: flex;
	align-items: center;
	// background-color: #71829e;
	.week {
	  width: 14.285%;
	  background-color: #152745;
		color: #fff;
	  padding: 10px 0;
	  margin: 5px;
	  text-align: center;
	}
  }
  .dataList {
	display: flex;
	flex-wrap: wrap;
	.data{
	width: calc((100% / 7) - 10px);

	min-width:  14.285%;
  }
	.days {

		// min-width: 100px;
		display: flex;
		flex-wrap: wrap;
		// width: calc(14.285% - 50px);
		text-align: center;
		padding: 5px;
		justify-content: center;
		flex-direction: column;
	  .contentDay{
		text-align: center;
		// padding: 5px 0;
	  }
	  .contentDes {
		// padding: 5px 0;
		background-color: rgba(51, 80, 90, 0.3);
	  }
	}
	.dateActive {
		background-color: rgba(130, 154, 193,.5);
	}
  }
 
  .date-page{
	width: 90%;
	margin: 0 auto;
	color: #71829e;
  }
  </style>
  