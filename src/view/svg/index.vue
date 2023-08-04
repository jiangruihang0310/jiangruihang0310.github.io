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
            :points="svgData[currentIndex][0]"
            fill="none"
            class="g-rect-fill"
            stroke="#00e9f9"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="1920px"
          height="1080px"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid meet"
        >
          <g fill="#514f3e">
            <path
              d="M782.1 808.6 c-0.6 -0.7 -1.3 -4.5 -1.6 -8.3 -0.2 -3.9 -1.3 -8.9 -2.5 -11.6 l-2.1 -4.7 2.3 -3.1 2.3 -3.1 0 -257.4 c0 -227.8 -0.2 -257.6 -1.5 -258.4 -0.9 -0.6 -16.6 -1 -37.6 -1 -31.7 0 -36.3 0.2 -37.5 1.6 -0.9 1.1 -1.2 4.6 -1.1 11.7 0.2 8.5 0.5 10.4 2.2 12.2 2.5 2.7 2.5 3.6 0 8.5 -1.4 2.8 -2.1 6.4 -2.3 12.4 -0.4 9.1 -1.6 11.9 -5.1 11.4 -3.1 -0.4 -4.6 -4.5 -4.6 -12.3 0 -4.8 -0.7 -8.4 -2 -11.4 -2.5 -5.4 -2.5 -5.7 0 -8.8 1.7 -2.2 2 -4.1 2 -12.7 0 -6.6 -0.4 -10.6 -1.2 -11.4 -1.7 -1.7 -331.9 -1.7 -333.6 0 -0.9 0.9 -1.2 21.1 -1.2 84.5 l0 83.4 -2.5 2.4 -2.4 2.5 -71.9 0 c-68.4 0 -72 -0.1 -73.5 -1.8 -2.1 -2.3 -2.1 -3.6 -0.1 -5.6 1.4 -1.4 9.1 -1.6 69.7 -1.6 41.2 0 68.8 -0.4 69.7 -1 1.3 -0.8 1.5 -11.5 1.7 -84.7 l0.2 -83.8 2.6 -2.3 2.6 -2.2 726.7 0 726.6 0 3.7 -2.6 c3.5 -2.4 3.9 -2.5 6.7 -1 8.1 4.2 8.1 12 0 16.2 -2.8 1.5 -3.2 1.4 -6.7 -1 l-3.7 -2.6 -507 0 c-393 0 -507.3 0.3 -508.2 1.2 -0.9 0.9 -1.2 59.8 -1.2 258.9 0 231.8 0.2 257.8 1.6 258.9 3.2 2.7 3.4 4.5 1 9.1 -1.5 2.8 -2.5 6.9 -2.8 11.2 -0.3 3.7 -1.1 7.4 -1.8 8.2 -1.6 1.9 -4.4 1.9 -5.9 0.1z"
            />
          </g>
          <g fill="#aaa683">
            <path
              d="M784 794.4 c0 -0.9 -1.6 -3.8 -3.5 -6.5 -3.3 -4.6 -3.5 -6.8 -0.5 -4.9 2.2 1.4 4 0 4 -3.1 0 -3.8 1.7 -3.7 2.5 0.1 0.8 3.7 1.9 4.4 4.5 3 3 -1.6 2.5 0.3 -1.5 5.6 -1.9 2.5 -3.5 5.2 -3.5 6 0 0.8 -0.4 1.4 -1 1.4 -0.5 0 -1 -0.7 -1 -1.6z"
            />
            <path
              d="M206 430.5 c0 -1.3 8.4 -1.5 70.8 -1.5 67.4 0 71 -0.1 72.5 -1.8 1.6 -1.7 1.7 -9.2 1.7 -87 l0 -85.2 730.4 0 c673.6 0 730.4 -0.1 731 -1.6 0.4 -0.9 0.2 -2.2 -0.4 -2.9 -0.6 -0.7 -0.7 -1.6 -0.2 -1.9 1.3 -0.8 9.2 7.3 8.6 8.9 -0.5 1.3 -6.7 6.5 -7.8 6.5 -0.2 0 -0.4 -1.2 -0.3 -2.8 l0.2 -2.7 -511.4 -0.3 c-362.1 -0.1 -511.8 0.1 -512.7 0.9 -0.7 0.6 -1.6 2.4 -1.9 4 -0.8 3.5 -2.5 3.9 -2.5 0.6 0 -1.3 -0.8 -3.1 -1.8 -4 -1.7 -1.5 -6 -1.7 -40.9 -1.7 -36.5 0 -39.1 0.1 -40.6 1.8 -1 1 -1.7 3.1 -1.7 4.5 0 3.8 -1.7 3.4 -2.5 -0.5 -0.4 -1.8 -1.2 -3.9 -1.7 -4.5 -0.8 -1 -36.1 -1.3 -170.4 -1.3 -93.2 0 -169.5 0.1 -169.6 0.3 -0.2 0.1 -0.5 39.1 -0.8 86.7 l-0.5 86.5 -73.7 0.3 c-65.2 0.2 -73.8 0 -73.8 -1.3z"
            />
            <path
              d="M697 317 c0 -1.1 0.5 -2 1 -2 0.6 0 1 0.9 1 2 0 1.1 -0.4 2 -1 2 -0.5 0 -1 -0.9 -1 -2z"
            />
            <path
              d="M696.5 301 c-0.9 -3.9 -3.1 -8.5 -5 -10 -2.3 -1.9 -1.8 -3.1 1.2 -2.8 2.4 0.3 2.8 -0.2 3.6 -3.4 0.5 -2.1 1.3 -3.8 1.7 -3.8 0.5 0 1 1.7 1.2 3.8 0.3 3.5 0.5 3.7 3.6 3.6 3.1 -0.2 4.2 0.9 2.2 2.1 -2.1 1.3 -6 8.5 -6 11 0 3.5 -1.7 3.1 -2.5 -0.5z"

            />
          </g>
          <g fill="#ede7b6">
            <path
              d="M784 799.8 c0 -9 -0.1 -9.3 -3.2 -12.5 -3.6 -3.8 -3 -5.8 0.7 -2.3 l2.5 2.3 0 -264.5 0 -264.5 -3.7 -0.7 c-5 -0.8 -74.1 -0.8 -78.2 0 l-3.1 0.7 0 17.5 0 17.6 3 -2.9 c1.6 -1.6 3.2 -2.6 3.5 -2.4 0.2 0.3 -1.1 2.1 -3 3.9 l-3.5 3.4 0 11.3 c0 6.9 -0.4 11.3 -1 11.3 -0.6 0 -1 -4.4 -1 -11.3 0 -11.3 0 -11.3 -3 -14.2 -1.6 -1.6 -3 -3.3 -3 -3.9 0 -0.5 1.4 0.3 3 1.9 l3 2.9 0 -17.6 0 -17.5 -3.7 -0.7 c-2.1 -0.3 -77.8 -0.6 -168.3 -0.6 -90.5 0 -166.2 0.3 -168.3 0.6 l-3.7 0.7 0 86.3 0 86.4 -73.7 -0.2 -73.8 -0.3 72.8 -0.2 72.7 -0.3 0 -87 0 -87 732.5 0 c402.9 0 732.5 -0.4 732.5 -0.8 0 -0.5 -0.9 -1.7 -2 -2.7 -2 -1.8 -2.6 -3.5 -1.2 -3.5 0.4 0 2.2 1.9 4.1 4.2 l3.5 4.1 -3.9 3.4 c-4.3 3.7 -6.1 3.6 -2.6 -0.1 l2.3 -2.4 -7.4 -0.7 c-9.1 -0.8 -1021.4 -0.2 -1022.2 0.6 -0.3 0.3 -0.5 119.5 -0.4 264.8 l0.3 264.3 2.8 -2.2 c4.1 -3.3 4.2 -1.9 0.2 2 l-3.5 3.4 0 9.3 c0 5.5 -0.4 9.3 -1 9.3 -0.6 0 -1 -3.7 -1 -9.2z"
            />
          </g>
          <g fill="#ede7b6">
            <path
              d="M784 799.8 c0 -9 -0.1 -9.3 -3.2 -12.5 -3.6 -3.8 -3 -5.8 0.7 -2.3 l2.5 2.3 0 -264.5 0 -264.5 -3.7 -0.7 c-5 -0.8 -74.1 -0.8 -78.2 0 l-3.1 0.7 0 17.5 0 17.6 3 -2.9 c1.6 -1.6 3.2 -2.6 3.5 -2.4 0.2 0.3 -1.1 2.1 -3 3.9 l-3.5 3.4 0 11.3 c0 6.9 -0.4 11.3 -1 11.3 -0.6 0 -1 -4.4 -1 -11.3 0 -11.3 0 -11.3 -3 -14.2 -1.6 -1.6 -3 -3.3 -3 -3.9 0 -0.5 1.4 0.3 3 1.9 l3 2.9 0 -17.6 0 -17.5 -3.7 -0.7 c-2.1 -0.3 -77.8 -0.6 -168.3 -0.6 -90.5 0 -166.2 0.3 -168.3 0.6 l-3.7 0.7 0 86.3 0 86.4 -73.7 -0.2 -73.8 -0.3 72.8 -0.2 72.7 -0.3 0 -87 0 -87 732.5 0 c402.9 0 732.5 -0.4 732.5 -0.8 0 -0.5 -0.9 -1.7 -2 -2.7 -2 -1.8 -2.6 -3.5 -1.2 -3.5 0.4 0 2.2 1.9 4.1 4.2 l3.5 4.1 -3.9 3.4 c-4.3 3.7 -6.1 3.6 -2.6 -0.1 l2.3 -2.4 -7.4 -0.7 c-9.1 -0.8 -1021.4 -0.2 -1022.2 0.6 -0.3 0.3 -0.5 119.5 -0.4 264.8 l0.3 264.3 2.8 -2.2 c4.1 -3.3 4.2 -1.9 0.2 2 l-3.5 3.4 0 9.3 c0 5.5 -0.4 9.3 -1 9.3 -0.6 0 -1 -3.7 -1 -9.2z"
			  class="flowing-path"
            />
          </g>
		  <g fill="#ede7b6">
            <path
              d="M784 799.8 c0 -9 -0.1 -9.3 -3.2 -12.5 -3.6 -3.8 -3 -5.8 0.7 -2.3 l2.5 2.3 0 -264.5 0 -264.5 -3.7 -0.7 c-5 -0.8 -74.1 -0.8 -78.2 0 l-3.1 0.7 0 17.5 0 17.6 3 -2.9 c1.6 -1.6 3.2 -2.6 3.5 -2.4 0.2 0.3 -1.1 2.1 -3 3.9 l-3.5 3.4 0 11.3 c0 6.9 -0.4 11.3 -1 11.3 -0.6 0 -1 -4.4 -1 -11.3 0 -11.3 0 -11.3 -3 -14.2 -1.6 -1.6 -3 -3.3 -3 -3.9 0 -0.5 1.4 0.3 3 1.9 l3 2.9 0 -17.6 0 -17.5 -3.7 -0.7 c-2.1 -0.3 -77.8 -0.6 -168.3 -0.6 -90.5 0 -166.2 0.3 -168.3 0.6 l-3.7 0.7 0 86.3 0 86.4 -73.7 -0.2 -73.8 -0.3 72.8 -0.2 72.7 -0.3 0 -87 0 -87 732.5 0 c402.9 0 732.5 -0.4 732.5 -0.8 0 -0.5 -0.9 -1.7 -2 -2.7 -2 -1.8 -2.6 -3.5 -1.2 -3.5 0.4 0 2.2 1.9 4.1 4.2 l3.5 4.1 -3.9 3.4 c-4.3 3.7 -6.1 3.6 -2.6 -0.1 l2.3 -2.4 -7.4 -0.7 c-9.1 -0.8 -1021.4 -0.2 -1022.2 0.6 -0.3 0.3 -0.5 119.5 -0.4 264.8 l0.3 264.3 2.8 -2.2 c4.1 -3.3 4.2 -1.9 0.2 2 l-3.5 3.4 0 9.3 c0 5.5 -0.4 9.3 -1 9.3 -0.6 0 -1 -3.7 -1 -9.2z"
			  class="flowing-path2"
            />
          </g>
		  <g fill="#ede7b6">
            <path
              d="M784 799.8 c0 -9 -0.1 -9.3 -3.2 -12.5 -3.6 -3.8 -3 -5.8 0.7 -2.3 l2.5 2.3 0 -264.5 0 -264.5 -3.7 -0.7 c-5 -0.8 -74.1 -0.8 -78.2 0 l-3.1 0.7 0 17.5 0 17.6 3 -2.9 c1.6 -1.6 3.2 -2.6 3.5 -2.4 0.2 0.3 -1.1 2.1 -3 3.9 l-3.5 3.4 0 11.3 c0 6.9 -0.4 11.3 -1 11.3 -0.6 0 -1 -4.4 -1 -11.3 0 -11.3 0 -11.3 -3 -14.2 -1.6 -1.6 -3 -3.3 -3 -3.9 0 -0.5 1.4 0.3 3 1.9 l3 2.9 0 -17.6 0 -17.5 -3.7 -0.7 c-2.1 -0.3 -77.8 -0.6 -168.3 -0.6 -90.5 0 -166.2 0.3 -168.3 0.6 l-3.7 0.7 0 86.3 0 86.4 -73.7 -0.2 -73.8 -0.3 72.8 -0.2 72.7 -0.3 0 -87 0 -87 732.5 0 c402.9 0 732.5 -0.4 732.5 -0.8 0 -0.5 -0.9 -1.7 -2 -2.7 -2 -1.8 -2.6 -3.5 -1.2 -3.5 0.4 0 2.2 1.9 4.1 4.2 l3.5 4.1 -3.9 3.4 c-4.3 3.7 -6.1 3.6 -2.6 -0.1 l2.3 -2.4 -7.4 -0.7 c-9.1 -0.8 -1021.4 -0.2 -1022.2 0.6 -0.3 0.3 -0.5 119.5 -0.4 264.8 l0.3 264.3 2.8 -2.2 c4.1 -3.3 4.2 -1.9 0.2 2 l-3.5 3.4 0 9.3 c0 5.5 -0.4 9.3 -1 9.3 -0.6 0 -1 -3.7 -1 -9.2z"
			  class="flowing-path3"
            />
          </g>
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
    <!-- <span class="bottom-title">信息机房应用成效</span> -->
  </div>
</template>
  
  <script>
//   import Subtitles from '../../../publicoComponents/Subtitles.vue'

export default {
  props: {},
  data() {
    return {
      title: {
        zh: "信息机房应用成效",
        en: "Application effectiveness of information room",
      },
      TabList: ["联通互通", "云边协作", "数字可视化", "系统对接"],
      currentIndex: 0,
      svgData: [
        [
          "s",
          "180,0 180,50 753,50 753,97",
          "160,0 160,70 580,70 580,97",
          "140,0 140,90 405,90 405,96",
        ],
        [
          "530,0 530,30 930,30 930,97",
          "510,0 510,50 753,50 753,97",
          "490,0 490,70 580,70 580,97",
          "470,0 470,90 405,90 405,96",
        ],
        [
          "860,0 860,97 930,97 930,97",
          "840,0 840,50 840,97 753,97",
          "820,0 820,83 580,83 580,97",
          "800,0 800,70 405,70 405,96",
        ],
        [
          "1190,0 1190,97 930,97 930,97",
          "1170,0 1170,83 753,83 753,97",
          "1150,0 1150,70 580,70 580,97",
          "1130,0 1130,58 405,58 405,96",
        ],
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    activeClick(index) {
      this.currentIndex = index;
    },
    leftBtnClick() {
      if (this.currentIndex === 0) {
        this.currentIndex = 3;
        return;
      }
      this.currentIndex--;
    },
    rightBtnClick() {
      if (this.currentIndex === 3) {
        this.currentIndex = 0;
        return;
      }
      this.currentIndex++;
    },
  },
  components: {
    //   Subtitles
  },
};
</script>
  
  <style scoped lang="scss">
.right-page {
  height: 100%;
  // background-image: url("../img/dizuo.png");
  background-repeat: no-repeat;
  background-position: 50% 90%;
  position: relative;
  background: rgba(0, 0, 0, 0.8);
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
svg {
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
@keyframes dash {
  from {
    stroke-dashoffset: -1450;
  }
  to {
    stroke-dashoffset: 2250;
  }
}
@keyframes dash2 {
  from {
    stroke-dashoffset: -1450;
  }
  to {
    stroke-dashoffset: -700;
  }
}

@keyframes dash3 {
  from {
    stroke-dashoffset: -1450;
  }
  to {
    stroke-dashoffset: 500;
  }
}


.flowing-path {
  path {
    stroke: none; /* 去掉边框 */
  }
  stroke: red;
  stroke-width: 10;
  fill: transparent;
  stroke-dasharray: 30, 5500;
  stroke-dashoffset: 2200;
  animation: dash 8s linear infinite;
}
.flowing-path2 {
  path {
    stroke: none; /* 去掉边框 */
  }
  stroke: red;
  stroke-width: 10;
  fill: transparent;
  stroke-dasharray: 30, 5500;
  stroke-dashoffset: 2200;
  animation: dash2 4s linear infinite;
}
.flowing-path3 {
  path {
    stroke: none; /* 去掉边框 */
  }
  stroke: red;
  stroke-width: 10;
  fill: transparent;
  stroke-dasharray: 30, 5500;
  stroke-dashoffset: 2200;
  animation: dash3 6s linear infinite;
}
</style>
  
