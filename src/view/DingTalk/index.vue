<template>
	<div class="rolling-process">
	  <button @click="startRolling" :disabled="rolling">开始轧钢</button>
	  <svg :width="width" :height="height">
		<rect :width="width" :height="height" fill="#3498db" />
		<g v-if="!rolling">
		  <rect
			v-for="(piece, index) in pieces"
			:key="index"
			:x="piece.x"
			y="20"
			width="100"
			height="60"
			fill="#e74c3c"
		  />
		</g>
		<g v-else>
		  <rect :x="rollingPosition" y="20" width="100" height="60" fill="#e74c3c" />
		</g>
	  </svg>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		width: 800,
		height: 200,
		rolling: false,
		rollingPosition: 0,
		pieces: [],
	  };
	},
	methods: {
	  startRolling() {
		this.rolling = true;
		this.animateRolling();
	  },
	  animateRolling() {
		const duration = 3000; // 动画持续时间（毫秒）
		const startTime = Date.now();
  
		const animate = () => {
		  const currentTime = Date.now();
		  const elapsed = currentTime - startTime;
  
		  if (elapsed < duration) {
			this.rollingPosition = (this.width - 100) * (elapsed / duration);
			requestAnimationFrame(animate);
		  } else {
			this.rollingPosition = this.width - 100;
			this.rolling = false;
			this.cutPieces();
		  }
		};
  
		animate();
	  },
	  cutPieces() {
		// 模拟锯切过程
		const numPieces = 4; // 切割成多少块
		const pieceWidth = this.width / numPieces;
  
		this.pieces = Array.from({ length: numPieces }, (_, index) => ({
		  x: index * pieceWidth,
		}));
	  },
	},
  };
  </script>
  
  <style scoped>
  .rolling-process {
	text-align: center;
	padding: 20px;
  }
  
  svg {
	border: 1px solid #ccc;
  }
  
  button {
	margin-bottom: 20px;
  }
  </style>
  