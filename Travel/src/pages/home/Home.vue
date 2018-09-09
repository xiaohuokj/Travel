<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import HomeHeader from './components/Header'
  import HomeSwiper from './components/Swiper'
  import HomeIcons from './components/Icons'
  import HomeRecommend from './components/Recommend'
  import HomeWeekend from './components/Weekend'
  import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSwiper,
      HomeIcons,
      HomeRecommend,
      HomeWeekend
    },
    data () {
      return {
        lastCity: '',
        swiperList: [],
        iconList: [],
        recommendList: [],
        weekendList: []
      }
    },
    computed: {
      ...mapState({
        city: 'city'
      })
    },
    mounted () {
      this.lastCity = this.city
      this.getHomeInfo()
    },
    activated() { // 只有从城市页面跳转过来才会执行，this.lastCity相当于上一次请求存储，this.city是vuex中的数据
      // 如果上一次lastCity 与本次this.city不等， 就赋值给lastCity，条件成立重新调用getHomeInfo，如果相等，则不执行这段代码
      if (this.lastCity !== this.city) {
        this.lastCity = this.city
        this.getHomeInfo()
      }
    },
    methods: {
      getHomeInfo() {
        axios.get('/api/index.json?city=' + this.city).then(this.getHomeInfoSucc)
      },
      getHomeInfoSucc(res) {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          this.swiperList = data.swiperList
          this.iconList = data.iconList
          this.recommendList = data.recommendList
          this.weekendList = data.weekendList
        }
      }
    }
  }
</script>

<style>

</style>
