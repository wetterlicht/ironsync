<template>
  <input type="number" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
input {
  font-family: 'Times New Roman', Times, serif;
  width: 60px;
  border-radius: 4px;
  outline: none;
  border: 1px solid transparent;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  text-align: center;
  padding: 4px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }

  &:focus {
    border: 1px solid #242527;
    box-shadow: 0 0 4px rgba(0, 0, 0, 1);
  }
}
</style>
