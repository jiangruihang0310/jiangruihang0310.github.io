<template>
	<div class="scene">
	  <div class="buttonList">
		  <div class="button" @click="explodes">模型分解</div>
		  <div class="button" @click="resets">模型合并</div>
	  </div>
	  <div class='list'>
		  <el-tree :data="meshList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
	  </div>
	  <div ref="dom" id="three"></div>
	</div>
  </template>
  
  <script>
  import {explode,reset} from '@/utils/split'
  import {mapState} from 'vue'
  import * as THREE from 'three'
  import {outlineObj,init,animate,addGLTFHandler,destroy} from '@/utils/three'
  export default {
	  data(){
		  return{
			  defaultProps: {
				  children: 'children',
				  label: 'name'
			  }
		  }
	  },
	  computed:{
		  meshList(){
			  console.log(this.$store.state.model.modelList);
			  return this.$store.state.model.modelList
		  },	
	  },
	  created(){
	  },
	  methods:{
		  explodes(){
			  explode(25)
		  },
		  resets(){
			  reset()
		  },
		  handleNodeClick(e){
			  if(!e.children){
				   console.log(e,'e');
				  outlineObj(e,'list')
			  }
		  }
	  },
	  destroyed(){
		  destroy()
	  },
	  mounted(){
		  init(this.$refs.dom,false)
		  animate()
		  this.$nextTick(()=>{
			  addGLTFHandler('/static/gltf/zlysj7.glb','')
		  })
	  },
	  watch:{
		  deep:true,
		  meshList:function(news){
			  console.log(news,'123456');
		  }
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
			  border: 1px solid #fff;
			  color: #fff;
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
	  .list{
		  position: absolute;
		  width: 200px;
		  background-color:#fff;
		  height: 100vh;
		  overflow-y:auto ;
		  right: 0;
	  }
  </style>