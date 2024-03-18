<template>
	<div class="date">
		<div class="title">日期计算</div>
		<div class="content">
			<div class="date1">
				<div class="date2">
					<div class="date3">日期1</div>
					<input type="date" v-model="value" />
				</div>
				<div class="date2">
					<div class="date3">日期2</div>
					<input type="date" v-model="value1" />
				</div>
				<button class="btn" @click="calculateDays(value,value1)">计算</button>
			</div>
			<div class="value">
				{{realVal+1}}天
			</div>
			<div class="zhu">
				注意：比实际天数多了一天。
			</div>
		</div>
	</div>
</template>

<script>
import { Message } from 'element-ui';
import {ref,reactive,toRefs,onMounted} from 'vue'
export default {
	setup(){
		const state=reactive({
			value:'',
			value1:'',
			realVal:0
		})
		const methods={
			calculateDays(date1, date2) {
				console.log(date1,date2);
				if(date1,date2){
					const oneDay = 1000 * 60 * 60 * 24; // 一天的毫秒数
					const timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime()); // 获取两个日期之间的毫秒数差值
					// return  // 计算天数并向上取整返回
					state.realVal=Math.ceil(timeDiff / oneDay);
				}else{
					Message.error('请选择日期')
				}
			}
		}
		return {...toRefs(state),...methods}
}
}

</script>

<style lang="scss" scoped>
	.date{
		font-family:'Odibee Sans' !important;
		width: 90%;
		margin: 0 auto;
	}
	.title{
		text-align: center;
		font-size: 22px;
		font-weight: 600;
	}
	.content{
		width: 100%;
		margin-top: 50px;
	}
	.date1{
		display: flex;
		justify-content: center;
	}
	.date2{
		margin: 40px;
	}
	.btn{
		
		width: 80px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		margin-left: 30px;
		margin-top: 50px;
	}
	.value{
		text-align: center;
		font-size: 22px;
		margin: 30px;
	}
	.zhu{
		margin-left: 120px;
		font-family:'Odibee Sans' !important;
		font-size:12px;
		color: #ccc;
	}
</style>