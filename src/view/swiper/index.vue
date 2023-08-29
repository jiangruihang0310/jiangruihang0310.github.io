<templakte>
	<div class="mySwiper">
		<swiper ref="mySwiper" :options="swiperOptions">
			<swiper-slide v-for="(item, index) in 5" v-bind:key="index">
				{{ item }}
			</swiper-slide>
		</swiper>
	</div>
</templakte>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css';
export default {
	data() {
		return {
			swiperOptions: {
				loop: true,
				speed: 2000,
				autoplay: {
					delay: 3000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				// 显示分页
				pagination: {
					el: ".swiper-pagination",
					clickable: true, //允许分页点击跳转
				},
				// 设置点击箭头
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				// 修改默认点击左右箭头样式
				// navigation: {
				// nextEl: ".swiper-button-next",
				//prevEl: ".swiper-button-prev",
				//},
			},

		}
	},
	components: {
		Swiper,
		SwiperSlide,
	},
	methods: {
		onSwiper(swiper) {
			console.log(swiper);
		},
		onSlideChange() {
			console.log('slide change');
		}
	}
}
</script>

<style lang="scss" scoped>
.mySwiper{
	width: 500px;
	height: 500px;
}
</style>