<template>
	<div class="echarts">
		<StartStop :data="data" :xAxis="xAxis" />
	</div>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from 'vue'
import StartStop from '@/components/StartStop'
export default {
	components:{
		StartStop
	},
	setup() {
		const state = reactive({
			data: [
					"0",
					"0",
					'1',
					'1',
					'-1',
					'1',
					'1',
					'1',
					'1',
					'1',
					'-1',
				],
			xAxis:[
					"2023-08-24 00:00:00",
					"2023-08-24 00:01:00",
					"2023-08-24 00:02:00",
					"2023-08-24 00:03:00",
					"2023-08-24 00:04:00",
					"2023-08-24 00:05:00",
					"2023-08-24 00:06:00",
					"2023-08-24 00:07:00",
					"2023-08-24 00:08:00",
					"2023-08-24 00:09:00",
					"2023-08-24 00:10:00",
				]
		})
		const methods = {
		
		}
		onMounted(() => {
		
		})
		return { ...toRefs(state), ...methods }
	}
}
</script>

<style lang="scss" scoped>
.echarts{
	width: 100%;
	height: 100%;
}
</style>