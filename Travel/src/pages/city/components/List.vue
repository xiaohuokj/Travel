<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button" @click="handleCityClick(currentCity)">{{this.currentCity}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" @click="handleCityClick(item.name)" v-for="item in hot" :key="item.id">
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item, key) in cities" :key="key" :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div class="item border-topbottom" v-for="innerItem in item" :key="innerItem.id" @click="handleCityClick(innerItem.name)">{{innerItem.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'CityList',
    props: {
      hot: Array,
      cities: Object,
      letter: String
    },
    mounted() { // 页面dom挂载完成之后执行
      this.scroll = new BScroll(this.$refs.wrapper)
    },
    computed: {
      ...mapState({
        currentCity: 'city'
      })
    },
    watch: {
      letter() {
        if (this.letter) {
          const element = this.$refs[this.letter][0]
          this.scroll.scrollToElement(element)
        }
      }
    },
    methods: {
      handleCityClick (city) {
        // this.$store.dispatch('changeCity', city)
        // this.$store.commit('changeCity', city)
        this.changeCity(city)
        this.$router.push('/')
      },
      ...mapMutations(['changeCity'])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .border-topbottom
    &:before
      border-color: #ccc;
    &:after
      border-color: #ccc;
  .border-bottom
    &:before
      border-color: #ccc;
  .list
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    .title
      line-height: .54rem;
      background: #eee;
      padding-left: .26rem;
      color: #666;
    .button-list
      overflow: hidden;
      padding: .1rem .6rem .1rem .1rem;
      .button-wrapper
        float: left;
        width: 33.33%;
        .button
          margin: .1rem;
          padding: .1rem 0;
          text-align: center;
          border: .02rem solid #ccc;
          border-radius: .06rem;
    .item-list
      .item
        line-height: .76rem;
        padding-left: .2rem;
</style>
