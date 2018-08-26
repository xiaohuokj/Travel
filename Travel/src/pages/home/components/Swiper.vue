<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'HomeSwiper',
    props: {
      list: Array
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true,
          autoplay: 3000,
          speed: 300
        }
      }
    },
    computed: {
      showSwiper () {
        return this.list.length
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // 三个 >>> 表示样式穿透 所有.wrapper 子组件中的 .swiper-pagination-bullet-active设置为这个样式
  .wrapper >>> .swiper-pagination-bullet-active
    background #fff;
  .wrapper
    width 100%;
    height 0;
    overflow hidden;
    padding-bottom 31.25%;
    background #ffffff;
    .swiper-img
      width 100%;
      height: 31.25vw;
</style>
