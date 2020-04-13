<template>
  <div class="wrapper">
    <textarea
      class="text-area-input"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
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
.wrapper {
  display: flex;
  padding: 4px;
  background-color: white;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 0, 1);
  }
}
.text-area-input {
  min-height: 10rem;
  flex-grow: 1;
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  padding: 4px;
  outline: none;
  border: 1px solid transparent;

  resize: vertical;
}
</style>
