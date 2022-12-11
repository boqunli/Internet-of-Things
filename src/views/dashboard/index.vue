<template>
  <div class="dashboard-container">
    <img :src="Img" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Img from './sleep.jpg'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return {
      Img:Img
    }
  },
  created() {
    console.log(2144235)
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-family: 等线,serif;
    font-size: 20px;
    line-height: 46px;
  }
}
</style>
