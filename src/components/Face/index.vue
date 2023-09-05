<template>
	<div class="face">
		<div class="x-face-detect-modal">
			<video ref="video" autoplay @canplay="onVideoCanPlay" />
			<div v-if="canPlay"></div>
			<div v-else>
				<ASpin size="large" tip="调取摄像头中..."></ASpin>
			</div>
			{{ getUserMediaFail ? '调取摄像头失败，请检查设备与设置' : null }}
			<canvas ref="canvas" :width="width" :height="height" />
			<img :src="imgSrc" />
		</div>
	</div>
</template>
  
<script>
import {
	detectSingleFace,
	nets,
	matchDimensions,
	resizeResults,
	draw,
	SsdMobilenetv1Options,
} from 'face-api.js';
export default {
	data() {
		return {
			canvas: null,
			video: null,
			width: 500,
			height: 500,
			canPlay: true,
			getUserMediaFail: false,
			computedService: null,
			options: null,
			imgSrc:''
		};
	},
	created() {
		// 指定面部检测器
		this.options = new SsdMobilenetv1Options({
			// 最小置信阈值
			// 默认值：0.5 
			minConfidence: 0.5,
		});
	},
	async mounted() {
		this.canvas = this.$refs['canvas'];
		this.video = this.$refs['video'];
		this.init();
		this.getUserMedia(
			(streams) => {
				// 后续用于停止视频流
				this.stream = streams;
				// 显示视频
				if (this.video) this.video.srcObject = streams;
			},
			(err) => (this.getUserMediaFail = true)
		);
		this.initViewFinder();
		this.detectFace();
	},
	methods: {
		async init() {
			await nets.ssdMobilenetv1.loadFromUri('/models');
		},

		getUserMedia(success, error) {
			const constraints = {
				video: {
					facingMode: 'user',
					width: { ideal: this.width },
					height: { ideal: this.height },
				},
			};
			if (navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices
					.getUserMedia(constraints)
					.then(success)
					.catch(error);
			} else if (navigator.webkitGetUserMedia) {
				navigator.webkitGetUserMedia(constraints, success, error);
			} else if (navigator.mozGetUserMedia) {
				navigator.mozGetUserMedia(constraints, success, error);
			} else if (navigator.getUserMedia) {
				navigator.getUserMedia(constraints, success, error);
			}
		},
		initViewFinder() {
			// 初始化取景框
			if (!this.video) return;
			const marginLeft = (this.video.videoWidth - this.width) / 2;
			const marginTop = (this.video.videoHeight - this.height) / 2;

			this.viewFinderBox = {
				topLeft: {
					x: marginLeft,
					y: marginTop
				},
				topRight: {
					x: marginLeft + this.width,
					y: marginTop
				},
				bottomLeft: {
					x: marginLeft,
					y: marginTop + this.height
				},
				bottomRight: {
					x: marginLeft + this.width,
					y: marginTop + this.height
				}
			};
		},
		drawViewFinder() {
			// 绘制取景框
			const context = this.canvas?.getContext("2d");
			const rectWidth = 50;

			if (!context) return;

			context.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
			const fontLeft = this.video ? (this.video.videoWidth - 200) / 2 : 200;
			context.font = "20px Arial";
			context.fillText("请保持脸部在取景框内", fontLeft, 50);

			const keys = Object.keys(this.viewFinderBox);
			keys.forEach((key) => {
				const point = this.viewFinderBox[key];
				if (!point) return;

				context.moveTo(point.x, point.y);

				switch (key) {
					case "topLeft":
						context.lineTo(point.x + rectWidth, point.y);
						context.moveTo(point.x, point.y);
						context.lineTo(point.x, point.y + rectWidth);
						break;
					case "topRight":
						context.lineTo(point.x - rectWidth, point.y);
						context.moveTo(point.x, point.y);
						context.lineTo(point.x, point.y + rectWidth);
						break;
					case "bottomLeft":
						context.lineTo(point.x + rectWidth, point.y);
						context.moveTo(point.x, point.y);
						context.lineTo(point.x, point.y - rectWidth);
						break;
					case "bottomRight":
						context.lineTo(point.x - rectWidth, point.y);
						context.moveTo(point.x, point.y);
						context.lineTo(point.x, point.y - rectWidth);
						break;
					default:
						break;
				}
			});

			context.lineWidth = 2;
			context.strokeStyle = "white";
			context.stroke();
		},
		async detectFace() {
			// 人脸检测
				// eslint-disable-next-line no-promise-executor-return
			//非常重要：防止卡死
			await new Promise(resolve => requestAnimationFrame(resolve));
			//绘制取景框
			this.drawViewFinder();
			if (
				!this.canvas ||
				!this.video ||
				!this.video.currentTime ||
				this.video.paused ||
				this.video.ended
			)
				return this.detectFace();
			// 检测图像中具有最高置信度得分的脸部
			const result = await detectSingleFace(this.video, this.options);
			console.log(result,'result....');
			if (!result) return this.detectFace();
			// 匹配尺寸
			const dims = matchDimensions(this.canvas, this.video, true);
			// 调整检测到的框的大小，以防显示的图像的大小与原始
			const resizedResult = resizeResults(result, dims);
			const box = resizedResult.box;
			// 检测框是否在取景框内
			// if (!this.checkInViewFinder(box)) return this.detectFace();
			this.drawViewFinder();
			// 将检测结果绘制到画布（此处不用，可以直接用来绘制检测到的人脸盒子）
			// draw.drawDetections(this.canvas, resizedResult.box);
			this.drawBox(box, "识别中");
			this.video.pause();
			//截取人脸图片
			const image = await this.cameraShoot(
				this.video,
				resizedResult.box.topLeft,
				resizedResult.box.width,
				resizedResult.box.height
			);
			if (!image) {
				this.drawBox(box, "识别失败");
				await delay(1000);
				this.video.play();
				return this.detectFace();
			}
			let files = new window.File([image], "人脸头像.jpeg", {
				type: "image/jpeg"
			});
			console.log(files);
			console.log(image);
			const detectResult= false
			//调用接口传入截取的人脸头像进行检测f
			// const detectResult = await this.computedService.faceDetect(
			// 	this.formId,
			// 	files
			// );
			if (!detectResult) {
				this.drawBox(box, "识别失败");
				await delay(1000);
				this.video.play();
				return this.detectFace();
			}else{
				this.drawBox(box,'识别成功	')
			}
			//停止视频
			this.handleStopVideo();
		},
		cameraShoot(video, startPoint, width, height) {
			// 截取快照
			const canvas = document.createElement("canvas");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			canvas
				.getContext("2d")
				?.drawImage(
					video,
					startPoint.x - 40,
					startPoint.y - 40,
					width + 80,
					height + 80,
					0,
					0,
					canvas.width,
					canvas.height
				)
			return new Promise (resolve =>{
				// eslint-disable-next-line no-promise-executor-return
				 canvas.toBlob(resolve, "image/jpeg")
				this.imgSrc = canvas.toDataURL(resolve, "image/jpeg")
			});
		},
		drawBox(box, label) {
			// 绘制box（带文字标签）
			if (!this.canvas) return;
			const context = this.canvas.getContext("2d");
			context?.clearRect(box.x, box.y, box.width, box.height);
			const drawBox = new draw.DrawBox(box, {
				label: label
			});
			drawBox.draw(this.canvas);
		},
		handleStopVideo() {
			this.stream?.getTracks().forEach((track) => track.stop());
		},
		onVideoCanPlay() {
			// 视频可以播放时触发的事件处理函数
			this.canPlay=true
		},
	},
};
</script>
  
<style lang="scss" scoped>
.x-face-detect-modal {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	transform: rotateY(0deg);

	canvas {
		position: absolute;
		top: 0;
	}

	video {
		object-fit: fill;
	}
}
</style>
  