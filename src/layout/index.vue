<template>
	  <div class="wrapper">
		  <Left/>
		  <div class="wrappers">
			<Top/>
		  <div class="content">
			  <router-view />
		  </div>
		  </div>
	  </div>
  </template>
  
  <script>
  import Top from './top'
  import Left from './left'
  export default {
	name: "layout",
	components:{
		Left,
		Top
	}
  };
  </script>
  
  <style lang="scss" scoped>
  .wrapper{
	  background-color:var( --bg );
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
	  opacity: var(--opacity );
	//   padding: 20px;
  }	
  .wrappers{
	width: calc(100% - 220px);
	position: relative;
  }
  .content{
	height: calc(100% - 80px);
	width: calc(100%);
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
  