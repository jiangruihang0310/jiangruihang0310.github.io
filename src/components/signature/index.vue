<template>
  <div class="sign-wrap">
    <div class="operate">
      <el-button size="mini" type="primary" @click="handleClear"
        >清空</el-button
      >
      <el-button size="mini" type="primary" @click="handleReset"
        >撤销一步</el-button
      >
      <el-button size="mini" type="primary" @click="handleConfirm"
        >保存</el-button
      >
    </div>
    <canvas
      id="signCanvas"
      :width="$props.WIDTH"
      :height="$props.HEIGHT"
    ></canvas>
  </div>
</template>

<script>
export default {
  props: {
    WIDTH: {
      type: Number,
      default: () => 400,
    },
    HEIGHT: {
      type: Number,
      default: () => 200,
    },
    //线条宽
    lineWidth: {
      type: Number,
      default: () => 2,
    },
    lineColor: {
      type: String,
      default: () => "#000",
    },
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      isDraw: false,
      lastX: 0,
      lastY: 0,
      imgStack: [],
      mobileStatus: /Mobile|Android|iPhone/i.test(navigator.userAgent),
      l: 0,
      t: 0,
    };
  },
  mounted() {
    this.canvas = document.getElementById("signCanvas");
    this.ctx = this.canvas.getContext("2d");
	this.l=this.canvas.offsetLeft
	this.t=this.canvas.offsetTop
	
    window.addEventListener(
      this.mobileStatus ? "touchstart" : "mousedown",
      this.start
    );
    window.addEventListener(
      this.mobileStatus ? "touchmove" : "mousemove",
      this.draw
    );
    window.addEventListener(
      this.mobileStatus ? "touchcancel" : "mouseup",
      this.stop
    );
  },
  methods: {
    start(event) {
      this.isDraw = true;
      this.lastX = event.offsetX || event.changedTouches[0].pageX-this.l;
      this.lastY = event.offsetY || event.changedTouches[0].pageY-this.t;
      let imgData = this.ctx.getImageData(
        0,
        0,
        this.$props.WIDTH,
        this.$props.HEIGHT
      );
      this.imgStack.push(imgData);
    },
    draw(event) {
      // console.log(event.changedTouches[0]);
      if (!this.isDraw) return;
      this.ctx.beginPath();
      const x = event.offsetX || event.changedTouches[0].pageX-this.l;
      const y = event.offsetY || event.changedTouches[0].pageY-this.t;

      // 画图
      // ctx.globalCompositeOperation = 'destination-out';
      this.drawLine(x, y);
    },
    stop(event) {
      this.isDraw = false;
    },
    drawLine(x, y) {
		console.log('000',this.canvas.offsetTop);
      this.ctx.beginPath();
      this.ctx.lineWidth = 3; //设置线宽状态
      this.ctx.strokeStyle = this.$props.lineColor; //设置线的颜色状态
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.closePath();
      // 每次移动都要更新坐标位置
      this.lastX = x;
      this.lastY = y;
    },
    handleClear() {
      this.imgStack.length = 0;
      this.ctx.clearRect(0, 0, this.$props.WIDTH, this.$props.HEIGHT);
    },
    handleReset() {
      if (this.imgStack.length === 0) return;
      this.ctx.putImageData(this.imgStack.pop(), 0, 0);
    },
    handleConfirm() {
      const base64Img = this.canvas.toDataURL("image/png");
      console.log(base64Img);
      const img = document.createElement("img");
      img.src = base64Img;
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid #ccc;
}
.sign-wrap {
	padding: 100px;	
}
</style>