import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import infiniteScroll from 'vue-infinite-scroll'
import vueSeamlessScroll from 'vue-seamless-scroll' // 循环滚动
import 'videojs-contrib-hls'
// import VideoPlayer from 'vue-video-player'
 import '@/assets/css/index.css'
 import '@/assets/css/test.css'
// require('video.js/dist/video-js.css')s
import Vue2OrgTree from 'vue-tree-color'
Vue.use(Vue2OrgTree) 
// require('vue-video-player/src/custom-theme.css')
 
// Vue.use(VideoPlayer)
Vue.use(vueSeamlessScroll)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(infiniteScroll)
let vue = new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});
export default vue

