<template>
  <input :value="value" type="text" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  font-family: 'Times New Roman', Times, serif;
  padding: 4px;
  border-radius: 4px;
  outline: none;
  border: 1px solid transparent;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  &:focus {
    border: 1px solid black;
    box-shadow: 0 0 4px rgba(0, 0, 0, 1);
  }
}
</style>
