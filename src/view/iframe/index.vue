<template>
	<div class="iframe">
		<iframe src="http://localhost:3000/?groupcode=zlysj7&code=MTMT000190" frameborder="0"></iframe>
	</div>
</template>

<script>
export default {
	mounted(){
		window.addEventListener('message', this.handleIncomingMessage, false)
	},
	methods:{
		handleIncomingMessage(e){
			console.log(e,'eeeeeeee');
			if(e.data.flag){
				this.$refs.iframe.style.width = e.data.width
			}
		}
	}
}
</script>

<style>
	.iframe{
		width: 100%;
		height: 100%;
	}
	.img{
		width: 100%;
		height: 100%;
		transform: translateY(3%)
	}
	iframe{
		position: fixed;
		right: 0;
		width: 1920px;
		height: 1080px;		
	}
</style>