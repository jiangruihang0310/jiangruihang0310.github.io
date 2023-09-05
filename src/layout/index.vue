<template>
	  <div class="wrapper">
		  <Left/>
		  <div class="content">
			  <router-view />
		  </div>
	  </div>
  </template>
  
  <script>
  import Left from './left'
  export default {
	name: "layout",
	components:{
		Left
	}
  };
  </script>
  
  <style lang="scss" scoped>
  .wrapper{
	  background-color:#16171a;
	  min-width: 65vw;
	  max-width: 65vw;
	  max-height: 900px;
	  height: 85vh;
	  display: flex;
	  overflow: hidden;
	  width: 100%;
	  border-radius: 20px;
	  font-size: 15px;
	  font-weight: 500;
	  box-shadow: rgba(0, 0, 0, 0.3) 0px 20px 50px;
	  position: relative;
	  opacity: 0.97;
	  padding: 20px;
  }	
  .content{
	height: 100%;
	width: calc(100% - 220px);
	display: flex;
	align-content: center;
	justify-content: center;
	overflow-y:auto;
	overflow-x:hidden;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    /* 关键代码 */
    background-image: -webkit-linear-gradient(45deg,
            rgba(255, 255, 255, 0.4) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.4) 75%,
            transparent 75%,
            transparent);
    border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #d3e9f8;
    border-radius: 32px;
}

  </style>
  