import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import City from '@/pages/city/City.vue'
import Detail from '@/pages/detail/Detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ],
  // 每次做路由切换，将页面始终是在顶部， 此功能可以做用户在某个页面看某个商品
  // 然后点击查看详情，退回来之后记录位置使用
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
