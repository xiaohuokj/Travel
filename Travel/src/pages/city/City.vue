<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list :cities="cities" :hot="hotCities" :letter="letter"></city-list>
    <city-alphabet @change="handleLetterChange" :cities="cities"></city-alphabet>
  </div>
</template>

<script>
  import axios from 'axios'
  import CityHeader from './components/Header'
  import CitySearch from './components/Search'
  import CityList from './components/List'
  import CityAlphabet from './components/Alphabet'
  export default {
    name: 'City',
    components: {
      CityHeader,
      CitySearch,
      CityList,
      CityAlphabet
    },
    data () {
      return {
        cities: {},
        hotCities: [],
        letter: ''
      }
    },
    mounted() {
      this.getCityInfo()
    },
    methods: {
      getCityInfo() {
        axios.get('/api/city.json').then(this.handleGetCityInfoSucc)
      },
      handleGetCityInfoSucc (res) {
        if (res.data.ret && res.data) {
          const data = res.data.data
          this.hotCities = data.hotCities
          this.cities = data.cities
        }
      },
      handleLetterChange(letter) {
        this.letter = letter
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
