import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import infiniteScroll from 'vue-infinite-scroll'
import vueSeamlessScroll from 'vue-seamless-scroll' // 循环滚动
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

