<template>
  <div id="app">
	<Layout/>
  </div>
</template>

<script>
import Layout from '@/layout'
export default {
  name: "App",
  components:{
	Layout
  }
};
</script>

<style lang="scss" scoped>
html,body,#app{
	width: 100%;
	height: 100%;
	padding:0;
	margin: 0 !important;
	/* overflow: hidden; */
	box-sizing: border;
	font-family:'Odibee Sans' !important;
	overflow: hidden;
}
body{
	margin: 0 !important;
}
#app {
	background:url('~@/assets/bg.jpg') no-repeat ;
	background-size: 100% 100%;
	background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: color-dodge;
    display: flex;	
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    /* padding: 1em 2em; */
    width: 100%;
    height: 100vh;
    overflow: hidden;
    user-select: none;
	opacity: 0.67;
	color: #fff !important;
	font-size:16px;
}


</style>
