<template>
  <div class="scene">
	<div class="buttonList">
		<div class="button" @click="explodes">模型分解</div>
		<div class="button" @click="resets">模型合并</div>
	</div>
	<div ref="dom" id="three"></div>
  </div>
</template>

<script>
import {explode,reset} from '@/utils/split'

import {init,animate,addGLTFHandler,destroy} from '@/utils/three'
export default {
	data(){
		return{
		}
	},
	created(){
	},
	methods:{
		explodes(){
			explode(100)
		},
		resets(){
			reset()
		}
	},
	destroyed(){
		destroy()
	},
	mounted(){
		init(this.$refs.dom,true)
		animate()
		this.$nextTick(()=>{
			addGLTFHandler('/static/gltf/as.gltf','')
		})
	}
}
</script>
<style lang="scss" scoped>
@import './index.scss';
	.scene{
		width: 100%;
		height:100%;
		overflow: hidden;
		position: relative;
	}
	.buttonList{
		position: absolute;
		top: 5px;
		left: 5px;
		width: 200px;
		height: 50px;
		display: flex;
		z-index: 1;
		.button{
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			border: 1px solid #71829e;
			color: #71829e;
			border-radius: 5px;
			padding: 5px;
			margin: 5px;
			height: 30px;
		}
	}
	#three{
		width: 100%;
		height: 100%;
		// background-color: rgb(0,0,0);
	}
</style>