<template>
	<div class="main-conteiner">
		<div class="logo-title">
			<div class="logo">
				<!-- <img src="../static/images/logo.svg" alt="" /> -->
			</div>
			<div class="title">
				<!-- <img src="../static/images/title.png" alt="" /> -->
			</div>
		</div>
		<div class="playground" ref="playground">
			<div class="animation-container" ref="animationRef">
				<div class="list" ref="listRef">
					<div class="list-item" :data-order="orderMap[index]" v-for="(item, index) in list" :key="index" :class="[
						index == 6 || index == 13 ? 'mr-0' : '',
						index > 6 ? 'mt-100' : '',
					]">
						<img :src="item.url" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="last-area">
			<img src="https://gw.alicdn.com/imgextra/i4/O1CN013OYoqp1foK6tig7lJ_!!6000000004053-2-tps-864-168.png" alt="" />
			<span>企业数字化一个钉钉就解决</span>
		</div>
	</div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from "vue";
const listRef = ref();
const playground = ref();
const animationRef = ref();

onMounted(() => {
	updateMap();
});

const list = [
	{
		name: "即时沟通",
		url: "https://img.alicdn.com/imgextra/i3/O1CN01TVWH501KYCEaUxPgv_!!6000000001175-0-tps-480-480.jpg",
	},
	{
		name: "组织",
		url: "https://img.alicdn.com/imgextra/i1/O1CN01vqBxIP1L5d98G9xJD_!!6000000001248-0-tps-480-480.jpg",
	},
	{
		name: "智能人事",
		url: "https://img.alicdn.com/imgextra/i3/O1CN01AKJU3T1tSi2NAFHFP_!!6000000005901-0-tps-480-480.jpg",
	},
	{
		name: "组织大脑",
		url: "https://img.alicdn.com/imgextra/i3/O1CN01AKJU3T1tSi2NAFHFP_!!6000000005901-0-tps-480-480.jpg",
	},
	{
		name: "OA审批",
		url: "https://img.alicdn.com/imgextra/i1/O1CN01sphiAp1Fj7bOKEppz_!!6000000000522-2-tps-480-480.png",
	},
	{
		name: "邮箱",
		url: "https://img.alicdn.com/imgextra/i2/O1CN015T9BdZ28Ns5n1A82W_!!6000000007921-0-tps-480-480.jpg",
	},
	{
		name: "Teambition",
		url: "https://img.alicdn.com/imgextra/i3/O1CN01bc6FKX1OCuHkDC2J7_!!6000000001670-0-tps-480-480.jpg",
	},
	{
		name: "文档",
		url: "https://img.alicdn.com/imgextra/i1/O1CN01Y936lS1whluhvos2E_!!6000000006340-0-tps-480-480.jpg",
	},
	{
		name: "音视频会议",
		url: "https://img.alicdn.com/imgextra/i3/O1CN017Wk2Cp1lp8VaSd22U_!!6000000004867-0-tps-480-480.jpg",
	},
	{
		name: "开放平台",
		url: "https://img.alicdn.com/imgextra/i4/O1CN016JIoXg1lMHYbmErdR_!!6000000004804-0-tps-240-240.jpg",
	},
	{
		name: "宜搭",
		url: "https://img.alicdn.com/imgextra/i3/O1CN011GyvMe1of0bAveV4u_!!6000000005251-0-tps-480-480.jpg",
	},
	{
		name: "钉闪会",
		url: "https://img.alicdn.com/imgextra/i2/O1CN01zFSNcP26wYrM09A4S_!!6000000007726-0-tps-480-480.jpg",
	},
	{
		name: "连接器",
		url: "https://img.alicdn.com/imgextra/i2/O1CN0142F9wc23s261dItxf_!!6000000007310-0-tps-480-480.jpg",
	},
	{
		name: "酷应用",
		url: "https://img.alicdn.com/imgextra/i4/O1CN012wi8vZ1xt3HbO0ttd_!!6000000006500-0-tps-480-480.jpg",
	},
];

const orderMap = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 2,
	5: 1,
	6: 0,
	7: 0,
	8: 1,
	9: 2,
	10: 3,
	11: 2,
	12: 1,
	13: 0,
};

// 动画曲线 - 根据传入的横坐标计算对应的纵坐标（value）
function createAnimation(
	scrollstart,
	scrollEnd,
	valueStart,
	valueEnd
) {
	return function (scroll) {
		if (scroll <= scrollstart) {
			return valueStart;
		}
		if (scroll >= scrollEnd) {
			return valueEnd;
		}
		return (
			valueStart +
			((valueEnd - valueStart) * (scroll - scrollstart)) /
			(scrollEnd - scrollstart)
		);
	};
}

// 映射 - dom => {}
const animationMap = new Map();

function getDomAnimation(scrollStart, scrollEnd, dom) {
	scrollStart = scrollStart + dom.dataset.order * 600;
	const opacityAimation = createAnimation(scrollStart, scrollEnd, 0, 1);
	const opacity = function (scroll) {
		return opacityAimation(scroll);
	};

	const xAnimation = createAnimation(
		scrollStart,
		scrollEnd,
		animationRef.value.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2,
		0
	);
	const yAnimation = createAnimation(
		scrollStart,
		scrollEnd,
		animationRef.value.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2,
		0
	);
	const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1);

	const transform = function (scroll) {
		return `translate(${xAnimation(scroll)}px, ${yAnimation(
			scroll
		)}px) scale(${scaleAnimation(scroll)})`;
	};

	return {
		opacity,
		transform,
	};
}
// 更新map
function updateMap() {
	// 每次调用时先将之前的清除掉，窗口大小等发生改变时重新处理
	animationMap.clear();
	const playGroundRect = playground.value.getBoundingClientRect();
	const scrollStart = playGroundRect.top + window.scrollY;
	const scrollEnd = playGroundRect.bottom + window.scrollY - window.innerHeight;
	for (const item of listRef.value.children) {
		animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item));
	}
}
// 更新dom的样式，遍历map给每个dom元素设置样式（透明度、偏移量、放缩....）
function updatestyles() {
	console.log(animationMap)
	const scroll = window.scrollY;
	for (let [dom, value] of animationMap) {
		for (const cssProp in value) {
			dom.style[cssProp] = value[cssProp](scroll);
		}
	}
}

// 初始时调用一次
updatestyles();

// 监听滚动条事件
window.addEventListener("scroll", updatestyles);
</script>
  
<style lang="scss" scoped>
.main-conteiner {
	width: 100%;
	height: 100%;
}

.logo-title {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 800px;

	// margin-top: 150px;
	.logo {
		width: 200px;
		height: 200px;

		img {
			display: block;
			width: 100%;
		}
	}

	.title {
		width: 800px;
		height: 100px;
		margin-top: 50px;

		img {
			display: block;
			width: 100%;
			background: #040506;
		}
	}
}

.playground {
	width: 100%;
	height: 3000px;

	.animation-container {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background: #040506;
		height: 710px;

		.list {
			display: flex;
			flex-wrap: wrap;
			width: 1200px;
			height: 460px;
			background: #15171b;
			border-radius: 20px;
			padding: 100px;
			box-sizing: border-box;
		}

		.list-item {
			width: 80px;
			height: 80px;
			margin-right: 73.333px;

			img {
				display: block;
				width: 80px;
				height: 80px;
				border-radius: 20px;
			}
		}

		.mr-0 {
			margin-right: 0;
		}

		.mt-100 {
			margin-top: 100px;
		}
	}
}

.last-area {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 800px;
	background: #0a0610;

	img {
		display: block;
		width: 200px;
		margin-right: 20px;
	}

	span {
		display: inline-block;
		line-height: 60px;
		font-size: 23px;
		font-weight: 700;
		color: #fff;
	}
}</style>
  