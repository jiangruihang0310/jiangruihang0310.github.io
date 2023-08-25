<template>
	<div class="music">
		<div class="music-wrapper"></div>
	</div>
</template>

<script>
import {reactive,ref,toRefs,onMounted} from 'vue'
export default {
	setup(){
		const state=reactive({
			musicValue:''
		})
		const methods={
			
		}
		return {...toRefs(state),...methods}
	}
}
</script>

<style lang="scss" scoped>

</style>