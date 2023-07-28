<template>
	<div class="lx">
		<div class="home" ref="home">
			<ul class="list" ref="list">
				<li class="item" v-for="item in list">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<marquee class="marquee" loop width="200">我我我我我我我我我我我是是是是是是是走走走走走走走走马马马马马马马马马灯灯灯灯</marquee>
		<button @click="handelClick">item</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},
				{
					name: 'item1',
					id: 1,
				},

			],
			busy: false,
			height: 0,
		}
	},
	mounted() {

	},
	methods: {
		loadMore() {
			this.busy = true;

			//官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
			setTimeout(() => {
				//这里请求接口去拿数据，实际应该是调用一个请求数据的方法
				this.busy = false;
			}, 1000);
		},
		handelClick() {
			alert('点它干嘛，下次别点了')
		}
	}
}
</script>

<style lang="scss">
.lx {
	width: 100%;
	height: 100%;
}

.home {
	width: 300px;
	height: 300px;
	overflow: auto;
	border: 1px solid #ccc;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	// z-index: 99;
}

.list {
	transition: all 0.1s;
	list-style: none;
	padding: 0;
}

.item {
	margin: 15px;
}

.marquee {
	position: fixed;
	top: 0%;
	right: 0%
}
</style>