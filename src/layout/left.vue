<template>
	<div class="layout-left">
		<div class="title">@JiangRuiHang</div>
		<div class="menu">
			<div class="menu-item" v-for="(item, index) in routeList">
				<div class="name">{{ item.name }}</div>
				<ul class="menu-item-children">
					<li v-for="(items, indexs) in item.children"
						:class="id == items.id ? 'children-item active' : 'children-item'" :key='item.sid'
						:title="items.description" @click="() => onClickHandler(items)">{{ items.name }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { toRefs, ref, onMounted, watch, reactive } from 'vue'
// import { useRouter } from 'vue-router'
export default {
	setup() {
		// const router=useRouter()
		const state = reactive({
			routeList: [
				{
					name: "DEMO",
					children: [
						{
							name: "MUSIC",
							id: 1,
							description: "音乐",
							path: "/"
						},
						{
							name: "Gantt",
							id: 2,
							description: "甘特图",
							path: "/gantt"
						},
						{
							name: "Status start-stop diagram",
							id: 3,
							description: "状态启停图",
							path: "echart"
						},
						{
							name: "Face Recognition",
							id: 4,
							description: "人脸识别",
							path: "/face"
						},
						{
							name:'Svg Flow Diagram',
							description:"SVG流动图",
							id:5,
							path:"/svg"
						},
						{
							name:"Pulsating Emoji",
							description:"跳动的表情包",
							id:6,
							path:'/emoji'
						},
						{
							name: "Car-model-scene",
							id: 7,
							description: "汽车模型场景",
							path: '/scene'
						},
						{
							name:'THEME',
							id:8,
							description: "主题切换",
							path:"/canvas"
						},
					]
				},
				{
					name: "ABOUT",
					children: [
						{
							id: 9,
							name: "log",
							description: 'log',
							path: "/log"
						}
					]
				}

			],
			id:  localStorage.getItem('id') || 1 
		})
		const methods = {
			onClickHandler(item) {
				state.id = item.id
				localStorage.setItem('id',state.id)
				this.$router.push({ path: item.path })
			}
		}
		onMounted(() => {

		})
		return { ...toRefs(state), ...methods }
	}
}
</script>

<style lang="scss" scoped>
.layout-left {
	width: 280px;
	height: 100%;
	color: var(--color);
	padding: 20px;
	border-right: 1px solid var(--border);
	padding: 30px;
}

.title {
	height: 30px;
	font-size: 22px;
	font-weight: 600;

}

.menu {
	margin-top: 24px;

	&-item {
		margin-bottom: 30px;

		.name {
			line-height: 30px;
			font-size: 20px;
			letter-spacing: 0.07em;
			font-weight: 600;
		}

		&-children {
			font-size: 18px;
			line-height: 30px;
			padding-left: 12px;
		}
		.children-item{
			cursor: pointer;
		}
	}

	.active {
		transition: all 0.5s;
		transform: translate(1.1);
		color: var(--active);
	}
}
</style>