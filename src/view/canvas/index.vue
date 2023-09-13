<template>
	<div class="canvas">
		<Theme/>
	</div>
</template>

<script>
import Theme from '@/components/theme'
export default {
	components:{
		Theme
	}
}
</script>

<style lang="scss" scoped>
	.canvas{
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>