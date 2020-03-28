<template>
  <div class="layout">
    <navigation-bar> </navigation-bar>
    <nuxt class="content" />
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageFooter from '~/components/PageFooter.vue'
import NavigationBar from '~/components/NavigationBar.vue'
export default {
  components: {
    NavigationBar,
    PageFooter
  }
}
</script>

<style lang="scss" scoped>
html,
body,
#__nuxt,
#__layout {
  height: 100%;
  margin: 0;
  padding: 0;
}

.layout {
  background-color: #8f8f8f;
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .content {
    flex: 1;
    margin-bottom: 60px;
  }
}
</style>
