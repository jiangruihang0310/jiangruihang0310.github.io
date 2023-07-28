<template>
	<div class="canvas">
		<Signature/>
	</div>
</template>

<script>
import Signature from '@/components/signature'
export default {
	components:{
		Signature
	}
}
</script>

<style lang="scss" scoped>
	.canvas{
		position: relative;
		width: 100%;
		height: 100%;
		
	}
</style>