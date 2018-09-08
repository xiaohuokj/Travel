<template>
  <div>
    <div class="search">
      <input v-model="keyword" class="search-input" type="text" placeholder="输入城市名或拼音">
    </div>
    <div class="search-content" v-show="keyword" ref="search">
      <div>
        <ul>
          <li class="search-item border-bottom" v-for="item in list" :key="item.id" @click="handleCityClick(item.name)">{{item.name}}</li>
          <li class="search-item border-bottom" v-show="hasNodData">没有找到匹配数据</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapMutations } from 'vuex'
  export default {
    name: 'CitySearch',
    props: {
      cities: Object
    },
    data() {
      return {
        keyword: '',
        list: [],
        timer: null
      }
    },
    computed: {
      hasNodData() { // 如果没有搜索到符合数据，即不显示 ‘没有找到匹配数据’
        return !this.list.length
      }
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.search)
    },
    watch: {
      keyword () {
        if (!this.keyword) {
          clearTimeout(this.timer)
        }
        if (!this.keyword) {
          this.list = []
          return
        }
        this.timer = setTimeout(() => { // 输入框匹配数据相应的搜索结果
          const result = []
          for (let i in this.cities) {
            this.cities[i].forEach((value) => {
              if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
                result.push(value)
              }
            })
          }
          this.list = result
        }, 100)
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
  .search
    height: .72rem;
    background: $bgColor;
    padding: 0 .1rem;
    .search-input
      box-sizing: border-box;
      width: 100%;
      height: .62rem;
      padding: 0 .1rem;
      line-height: .62rem;
      text-align: center;
      border-radius: .06rem;
      color: #666;
  .search-content
    z-index: 1;
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;
    .search-item
      line-height: .62rem;
      padding-left: .2rem;
      color: #666;
      background: #fff;
</style>
