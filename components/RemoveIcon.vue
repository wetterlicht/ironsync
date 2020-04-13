<template>
  <button @click.stop="$emit('remove')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      v-on="$listeners"
    >
      <line x1="0" y1="0" x2="10" y2="10" stroke-width="2"></line>
      <line x1="10" y1="0" x2="0" y2="10" stroke-width="2"></line>
    </svg>
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
button {
  margin: 0;
  padding: 0;
  outline: none;
  border: 0;
  font-size: 10px;
  line-height: 10px;
  background: none;

  &:hover,
  &:focus {
    svg line {
      stroke: #00c8fa;
    }
  }
}

svg {
  width: 10px;
  height: 10px;
}

line {
  stroke: white;
}
</style>
