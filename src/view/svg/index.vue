<template>
	<div class="right-page">
	  <!-- <Subtitles :hanzi="title.zh" :yingyu="title.en" class="title"></Subtitles> -->
	  <div class="tab-box">
		<div
		  class="tab-item"
		  v-for="(item, index) in TabList"
		  :key="index"
		  :class="{ active: currentIndex === index }"
		  @click.stop="activeClick(index)"
		>
		  {{ item }}
		</div>
	  </div>
	  <!-- <img
		src="../img/leftbtn.png"
		alt=""
		class="leftBtn"
		@click.stop="leftBtnClick"
	  />
	  <img
		src="../img/leftbtn.png"
		alt=""
		class="rightBtn"
		@click.stop="rightBtnClick"
	  />
	  <img src="../img/xiamtu.png" alt="" class="tab-content" /> -->
	  <!--  4条svg 线条 -->
	  <div class="container">
		<div class="line-wrap">
		  <!-- 111 -->
		  <svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xml:space="preserve"
			class="circle-load-rect-svg"
			viewbox="0 0 800 400"
		  >
			<polyline
			  :points="svgData[currentIndex][0]"
			  fill="none"
			  class="g-rect-path"
			  stroke="#007084"
			/>
			<polyline
			  points="200,0 200,30 930,30 930,97"
			  fill="none"
			  class="g-rect-fill1"
			  stroke="#00e9f9"
			/>
			<polyline
			  points="200,0 200,30 930,30 930,97"
			  fill="none"
			  class="g-rect-fill2"
			  stroke="#00e9f9"
			/>
			<polyline
			  :points="svgData[currentIndex][0]"
			  fill="none"
			  class="g-rect-fill"
			  stroke="#00e9f9"
			/>
		  </svg>
		  <!-- 222 -->
		  <svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xml:space="preserve"
			class="circle-load-rect-svg"
			viewbox="0 0 600 400"
		  >
			<polyline
			  :points="svgData[currentIndex][1]"
			  fill="none"
			  class="g-rect-path"
			  stroke="#805c2c"
			/>
			<polyline
			  :points="svgData[currentIndex][1]"
			  fill="none"
			  class="g-rect-fill"
			  stroke="#feee3c"
			/>
		  </svg>
		  <!-- 333 -->
		  <svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xml:space="preserve"
			class="circle-load-rect-svg"
			viewbox="0 0 600 400"
		  >
			<polyline
			  :points="svgData[currentIndex][2]"
			  fill="none"
			  class="g-rect-path"
			  stroke="#19875c"
			/>
			<polyline
			 :points="svgData[currentIndex][2]"
			  fill="none"
			  class="g-rect-fill"
			  stroke="#3aeca1"
			/>
		  </svg>
		  <!-- 444 -->
		  <svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xml:space="preserve"
			class="circle-load-rect-svg"
			viewbox="0 0 600 400"
		  >
			<polyline
			  :points="svgData[currentIndex][3]"
			  fill="none"
			  class="g-rect-path"
			  stroke="#18808e"
			/>
			<polyline
			 :points="svgData[currentIndex][3]"
			  fill="none"
			  class="g-rect-fill"
			  stroke="#36f4fb"
			/>
		  </svg>
		</div>
	  </div>
	  <span class="bottom-title">信息机房应用成效</span>
	</div>
  </template>
  
  <script>
//   import Subtitles from '../../../publicoComponents/Subtitles.vue'
  
  export default {
	props: {},
	data () {
	  return {
		title: {
		  zh: '信息机房应用成效',
		  en: 'Application effectiveness of information room'
		},
		TabList: ['联通互通', '云边协作', '数字可视化', '系统对接'],
		currentIndex: 0,
		svgData: [
		  ['200,0 200,30 930,30 930,97', '180,0 180,50 753,50 753,97', '160,0 160,70 580,70 580,97', '140,0 140,90 405,90 405,96'],
		  ['530,0 530,30 930,30 930,97', '510,0 510,50 753,50 753,97', '490,0 490,70 580,70 580,97', '470,0 470,90 405,90 405,96'],
		  ['860,0 860,97 930,97 930,97', '840,0 840,50 840,97 753,97', '820,0 820,83 580,83 580,97', '800,0 800,70 405,70 405,96'],
		  ['1190,0 1190,97 930,97 930,97', '1170,0 1170,83 753,83 753,97', '1150,0 1150,70 580,70 580,97', '1130,0 1130,58 405,58 405,96']
		]
	  }
	},
	computed: {},
	mounted () {
	},
	methods: {
  
	  activeClick (index) {
		this.currentIndex = index
	  },
	  leftBtnClick () {
		if (this.currentIndex === 0) {
		  this.currentIndex = 3
		  return
		}
		this.currentIndex--
	  },
	  rightBtnClick () {
		if (this.currentIndex === 3) {
		  this.currentIndex = 0
		  return
		}
		this.currentIndex++
	  }
	},
	components: {
	//   Subtitles
	}
  }
  </script>
  
  <style scoped lang="scss">
  .right-page {
	height: 100%;
	// background-image: url("../img/dizuo.png");
	background-repeat: no-repeat;
	background-position: 50% 90%;
	position: relative;
  }
  .title {
	padding-top: 30px;
  }
  .tab-box {
	display: flex;
	width: 1320px;
	margin: 0 auto;
	padding-top: 80px;
	.tab-item {
	//   background-image: url("../img/3hdfa.png");
	  background-repeat: no-repeat;
	  background-position: center;
	  width: 224px;
	  margin: 0 auto;
	  height: 164px;
	  line-height: 122px;
	  text-align: center;
	  color: #fff;
	  font-size: 24px;
	  font-family: MicrosoftYaHei;
	  opacity: 0.6;
	}
	.active {
	  opacity: 1;
	}
  }
  .leftBtn {
	position: absolute;
	top: 19.5%;
	left: 13%;
  }
  .rightBtn {
	position: absolute;
	transform: rotate(180deg);
	top: 19.5%;
	left: 84%;
  }
  .tab-content {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -46%);
  }
  .container {
	width: 100%;
	margin-top: -20px;
  }
  .line-wrap {
	width: 1350px;
	height: 1080px;
	margin: 0 auto;
	position: relative;
  }
  svg{
	height: 500px;
  }
  .line-wrap svg:nth-child(2) {
	position: absolute;
	top: 0;
  }
  .line-wrap svg:nth-child(3) {
	position: absolute;
	top: 0;
  }
  .line-wrap svg:nth-child(4) {
	position: absolute;
	top: 0;
  }
  .circle-load-rect-svg {
	width: 1350px;
	margin: 10px;
  }
  
  .g-rect-path {
	fill: none;
	stroke-width: 3;
	stroke-linejoin: round;
	stroke-linecap: round;
  }
  
  .g-rect-fill {
	fill: none;
	stroke-width: 5;
	stroke-linejoin: round;
	stroke-linecap: round;
	stroke-dasharray: 5, 900;
	stroke-dashoffset: -100;
	animation: lineMove 3s cubic-bezier(0, 0, 0.74, 0.74) infinite;
  }
  
  .g-rect-fill1 {
	fill: none;
	stroke-width: 8;
	stroke-linejoin: round;
	stroke-linecap: round;
	stroke-dasharray: 5, 900;
	stroke-dashoffset: -100;
	animation: lineMove 3.5s cubic-bezier(0, 0, 0.74, 0.74) infinite;
  }
.g-rect-fill2 {
	fill: none;
	stroke-width: 8;
	stroke-linejoin: round;
	stroke-linecap: round;
	stroke-dasharray: 5, 900;
	stroke-dashoffset: -100;
	animation: lineMove 4s cubic-bezier(0, 0, 0.74, 0.74) infinite;
  }
  
  @keyframes lineMove {
	0% {
	  stroke-dashoffset: -850;
	}
	100% {
	  stroke-dashoffset: -0;
	}
  }
  .bottom-title {
	position: absolute;
	bottom: 30%;
	width: 100%;
	font-size: 36px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: #38dcff;
	text-align: center;
	line-height: 38px;
	background: linear-gradient(0deg, #2de9ff 0.146484375%, #2fa9ff 99.31640625%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
  }
  </style>
  
