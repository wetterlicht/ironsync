<template>
  <input
    :class="{ 'text-input': true, 'text-input--dark': isDark }"
    :value="value"
    type="text"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    isDark: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.text-input {
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
  outline: none;
  border: 1px solid transparent;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  &:focus {
    border: 1px solid black;
    box-shadow: 0 0 4px rgba(0, 0, 0, 1);
  }

  &.text-input--dark {
    &:focus {
      border: 1px solid #00c8fa;
      box-shadow: 0 0 4px rgba(255, 255, 255, 1);
    }
  }
}
</style>
