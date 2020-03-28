<template>
  <div>
    <navigation-bar> </navigation-bar>
    <nuxt />
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
export default {
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  background-color: #8f8f8f;
}
</style>
