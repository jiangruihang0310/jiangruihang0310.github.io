<template>
	<div class="music">
		<div class="music_box">
			<div class="title">
				Music
			</div>
		</div>
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
.music{
	width: 100vw;
	height: 100vh;
	background-color:rgba(0,0,0,1);
	color: #fff;
	position: relative;
}
.music_box{
	width: 80vw;
	height: 80vh;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	background-color:rgba(255,255,255,0.2);
	border-radius:10px;
	filter: blur(0.5);
	box-shadow: 0px 0px 10px 1px rgba(255,255,255,.5);
}

</style>