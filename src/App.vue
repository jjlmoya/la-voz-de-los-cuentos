<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    
  },
  setup() {
    const route = useRoute()

    return {
      currentRoute: route
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
</style>
