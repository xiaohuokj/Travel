<template>
  <div>
    <router-link tag="div" to="/" class="header-abs" v-show="showAbs">
      <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailHeader',
    data () {
      return {
        showAbs: true,
        opacityStyle: {
          opacity: 0
        }
      }
    },
    methods: {
      handleScroll() {
        console.log('scroll')
        const top = document.documentElement.scrollTop
        if (top > 60) {
          // 让渐隐渐显的透明度随着 数值改变
          let opacity = top / 140
          opacity = opacity > 1 ? 1 : opacity
          this.opacityStyle = {
            opacity
          }
          this.showAbs = false
        } else {
          this.showAbs = true
        }
      }
    },
    activated() { // 使用了window.addEventListener 等于全局都绑定了这个事件
      window.addEventListener('scroll', this.handleScroll)
    },
    deactivated() { // 对应上面事件进行解绑后，让事件仅对当前页面有效，（当离开/关闭本页面执行）
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header-abs
    position: absolute;
    left: .2rem;
    top: .2rem;
    width: .8rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: .4rem;
    text-align: center;
    background: rgba(0, 0, 0, .8)
    .header-abs-back
      color: #fff;
      font-size: .4rem;
  .header-fixed
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    color: #fff;
    background: $bgColor;
    font-size: .32rem;
    .header-fixed-back
      position: absolute;
      top: 0;
      left: 0;
      width: .64rem;
      text-align: center;
      font-size: .4rem;
      color: #fff;
</style>
