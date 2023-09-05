<template>
  <div id="app">
	<div class="wrapper">
		<router-view />
	</div>
  </div>
</template>

<script>
export default {
  name: "App",
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
	background:url('https://cdn.jsdelivr.net/gh/rick-chou/rick-assets/jpg/43.jpg') no-repeat ;
	background-size: 100% 100%;
	background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: color-dodge;
    background-color: #16171a;
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
	opacity: 0.87;
}
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

</style>
