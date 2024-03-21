<template>
	<div class="cross_wiondows">
		<div class="warpper">
			<div id="alert1" class="alert"></div>
		</div>
	</div>
</template>

<script>
import BALL from '@/utils/ball.js';
import * as win from '@/utils/win.js';
import * as storage from '@/utils/storage.js';
import {reactive,onMounted,toRefs,ref,onUnmounted} from 'vue'
export default {
	setup() {
		const state=reactive({
			alert:null,
			camera:null, 
			renderer:null, 
			scene:null,
			balls: []
		})
		let key
		const methods={
				init() {
					({ camera:state.camera, renderer:state.renderer, scene:state.scene } = win.init()); // 创建three摄像机、场景、渲染器
					key = storage.init(); // 生成当前窗口key值，并且存入storage
					methods.initBalls(); // 初始化渲染球体
					methods.animate(); // 开始动画渲染

					// 监听其它窗口storage变化事件
					// 如果窗口数量变化，则需要重新实例化球体数据
					// 如果数量没有变化，则需要更新所有球体对应窗口坐标
					window.addEventListener("storage", function (event) {
						if (event.key == "demo") {
							let wins = JSON.parse(event.newValue);
							if (JSON.parse(event.oldValue).length != JSON.parse(event.newValue).length) {

								state.balls.forEach(({ ball, key }) => {
									ball.remove();
								})
								methods.initBalls();
							}
							else {
								state.balls.forEach(item => {
									item.win = wins.find(w => w.key == item.key);
								});
							}
						}
					},true);
					// 监听页面unload事件，从storage删除对应数据
					window.addEventListener("unload", function () {
						storage.remove(key);
					});
					// 监听页面resize事件，更新摄像机比例和渲染器size
					window.addEventListener('resize', function () {
						win.resize(state.camera, state.renderer);
					});
				},
				initBalls() {
					state.balls = [];
					const wins = storage.getAll();
					console.log(wins),'wins';
					wins.forEach(win => {
						const ball = new BALL(state.camera, state.renderer, state.scene, { x: 0, y: 0 }, win.key);
						const keys = wins.filter(item => item.key != win.key).map(item => item.key);
					// console.log(keys);
						ball.init(keys);
						// console.log(keys,'keys...');
						/* 
						ball 球体three对象
						key 球体唯一key
						win 球体窗口坐标
						*/
						state.balls.push({ ball, key: win.key, win });
					})
				},
				animate() {
					requestAnimationFrame(methods.animate);

					const { screenX, screenY } = window;
					const currentWin = storage.get(key);
					// 判断当前窗口坐标是否有变化（即窗口是否移动），若有变化，则更新storage及ball数据
					if (currentWin&&(currentWin.screenX != screenX || currentWin.screenY != screenY)) {
						const value = { key:key, screenX, screenY };
						storage.set(key, value);
						balls.find(item => item.key == key).win = value;
					}

					// 循环所有球体数据，并在当前窗口渲染出来所有球体动画
					state.balls.forEach(({ ball, key: k, win }) => {
						const offset = {
							x: (win.screenX - screenX),
							y: -(win.screenY - screenY),
						};
						const movePs = [];
						// 过滤并遍历其它球体数据，用于渲染球体之间的连线动画
						state.balls.filter(item => item.key != k).forEach(({ ball: ball2, key: k2, win: win2 }) => {
							const moveP = {
								x: (win2.screenX - win.screenX),
								y: -(win2.screenY - win.screenY),
							};
							movePs.push({ key: k2, moveP });
						});

						// 渲染球体及其连线
						ball.render(offset, movePs);
					})

					// log();
				},
				log() {
					const { screenX, screenY, innerWidth, innerHeight } = window;
					state.alert1.textContent = JSON.stringify({
						key:key,
						screenX, screenY, innerWidth, innerHeight,
						storage: storage.getAll(),
					}, null, 2);
				},
		}
		onMounted(()=>{
			state.alert= document.getElementById('alert1');
			setTimeout(() => methods.init(), 500);
		})
		onUnmounted(()=>{
			win.destroy(state.scene,state.renderer,methods.animate)
			localStorage.removeItem('demo')
			cancelAnimationFrame(methods.animate)
		})
		return {...toRefs(state),...methods}
	},
}
</script>

<style>
.goback{
	z-index: 99999;
	position: absolute;
	
}
.alert1{
	width: 90vw;
	height: 90vh;
}
</style>