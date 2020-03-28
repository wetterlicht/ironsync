<template>
  <div>
    <input :value="value" type="text" @change="onValueChanged" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onValueChanged(value) {
      this.$emit('valueChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  font-family: 'Times New Roman', Times, serif;
  background-color: #4a4a4a;
  color: white;
  border: 0;
}
</style>
