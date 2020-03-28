<template>
  <svg v-on="$listeners" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
    <line x1="0" y1="0" x2="10" y2="10" stroke-width="2"></line>
    <line x1="10" y1="0" x2="0" y2="10" stroke-width="2"></line>
  </svg>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
svg {
  width: 10px;
  height: 10px;
}
svg:hover {
  line {
    stroke: white;
  }
}
line {
  stroke: #ccc;
}
</style>
