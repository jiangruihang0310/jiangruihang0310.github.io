<template>
	<div class="log">
		<div class="item">
			F12 打开控制台，输出结果
		</div>
		<div class="item">
			log
		</div>
		<div class="item">
			log
		</div>
		<div class="item">
			log
		</div>
		<div class="item">
			log
		</div>

	</div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
export default {
	setup(){
		const state=reactive({

		})

		// 美化打印实现方法
		const methods={
			 prettyLog () {
				const isEmpty = (value) => {
					return value == null || value === undefined || value === '';
				};
				const prettyPrint = (title, text, color) => {
					console.log(
						`%c ${title} %c ${text} %c`,
						`background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
						`border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
						'background:transparent'
					);
				};
				const info = (textOrTitle, content = '') => {
					const title = isEmpty(content) ? 'Info' : textOrTitle;
					const text = isEmpty(content) ? textOrTitle : content;
					prettyPrint(title, text, '#909399');
				};
				const error = (textOrTitle, content = '') => {
					const title = isEmpty(content) ? 'Error' : textOrTitle;
					const text = isEmpty(content) ? textOrTitle : content;
					prettyPrint(title, text, '#F56C6C');
				};
				const warning = (textOrTitle, content = '') => {
					const title = isEmpty(content) ? 'Warning' : textOrTitle;
					const text = isEmpty(content) ? textOrTitle : content;
					prettyPrint(title, text, '#E6A23C');
				};
				const success = (textOrTitle, content = '') => {
					const title = isEmpty(content) ? 'Success ' : textOrTitle;
					const text = isEmpty(content) ? textOrTitle : content;
					prettyPrint(title, text, '#67C23A');
				};
				const picture = (url, scale = 0.5) => {
					const img = new Image();
					img.crossOrigin = 'anonymous';
					img.onload = () => {
						const c = document.createElement('canvas');
						const ctx = c.getContext('2d');
						if (ctx) {
							c.width = img.width;
							c.height = img.height;
							ctx.fillStyle = 'red';
							ctx.fillRect(0, 0, c.width, c.height);
							ctx.drawImage(img, 0, 0);
							const dataUri = c.toDataURL('image/png');

							console.log(
								`%c sup?`,
								`font-size: 1px;
								padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
								background-image: url(${dataUri});
								background-repeat: no-repeat;
								background-size: ${img.width * scale}px ${img.height * scale}px;
								color: transparent;
								`
							);
						}
					};
					img.src = url;
				};

				// retu;
				return {
					info,
					error,
					warning,
					success,
					picture
				}
			}
		}
		onMounted(()=>{
			const log = methods.prettyLog();
			log.error('奥德彪', '出来的时候穷，生活总让我受穷，所以现在还是穷！');

			log.error('奥德彪', '前方的路看似危险，实际一点都不安全！');
			
			log.warning('奥德彪', '我并非无路可走 我还有死路一条! ');
			
			log.success('奥德彪', '钱没了可以再赚，良心没了便可以赚的更多。 ');
			log.picture('https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0514%2Fd0ea93ebj00sdgx56001xd200u000gtg00hz00a2.jpg&thumbnail=660x2147483647&quality=80&type=jpg');
	})
// 创建打印对象

		return {...toRefs(state),...methods}
	}	
}
</script>

<style lang="scss" scoped>
	.item{
		height: 400px;
	}
</style>