import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL,
  //   切换路由后滚动条置顶
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }

})
export default router