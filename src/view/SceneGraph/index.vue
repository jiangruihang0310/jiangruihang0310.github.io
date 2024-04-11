<template>
	<div class="canvas-container">
		<canvas></canvas>
	</div>
</template>

<script>
import { gsap } from 'gsap';
import Loader from '@/utils/Loader';
import configResources from '@/config/resources';
import Actions from './Actions';
import World from '@/Elements/World';
import Global from './Global';
export default {
	mounted(){
		const global = Global.getInstance();
		const loader = new Loader();
		// 配置准备创建世界
		const config = {
			width: window.innerWidth,
			height: window.innerHeight,
			canvas: document.createElement('canvas')
		};

		let world;

		// 初始化世界
		const canvas = document.querySelector('canvas');
		if (canvas) {
			config.canvas = canvas;
			world = new World(config);
		}

		/** 加载过程开始 */
		loader.load(configResources);

		const percent = document.querySelector('.percent');
		loader.onFileLoaded(() => {
			const value = (loader.totalSuccess / loader.total) * 100;
			if (percent instanceof HTMLElement) {
				percent.innerText = String(Math.round(value));
			}
		});

		loader.onLoadEnd(resources => {
			
			world.build(resources);

			const tl = gsap.timeline({ onComplete: () => {

				const navAbout = document.querySelector('.nav-about');
				const navWorks = document.querySelector('.nav-works');

				if (navAbout instanceof HTMLDivElement && navWorks instanceof HTMLDivElement) {
					new Actions({
						about: navAbout,
						works: navWorks
					});
				}

			}});
			tl.to('.loading .value', { opacity: 0 });
			tl.to('.loading img', { scale: 0, opacity: 0, ease: 'power2' });
			tl.to('.loading', { opacity: 0, display: 'none' });
			tl.to('.nav', { top: 0, duration: 1, ease: 'power2' });
		});

/** 加载过程结束 */

		window.addEventListener('resize', () => {
			world.updateSize(window.innerWidth, window.innerHeight);
		});

		window.addEventListener('mousemove', (evt) => {
			global.updateMouse(evt);
		});

	}
}
</script>

<style>
@import url('./style.scss');
	
</style>
