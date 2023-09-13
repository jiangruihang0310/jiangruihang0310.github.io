<template>
  <div class="top">
	<div class="wrapper">
		<div class="themes">
			<Theme/>
		</div>
	</div>
  </div>
</template>

<script>
import Theme from '@/components/theme'
export default {
	components:{
		Theme
	},
	setup(props){

	}
}
</script>

<style lang="scss" scoped>
	.top{
		width: 100%;
		height: 80px;
		// border-bottom: 1px solid var(--border);
		position: relative;
		// box-shadow: 0 2px 2px var(--border);
	}
	.wrapper{
		width: 95%;
		margin: 0 auto;
	}
	.themes{
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%)
	}
</style>