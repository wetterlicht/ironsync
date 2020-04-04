<template>
  <button class="button" v-on="$listeners"><slot></slot></button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
  border: 0;
  border-radius: 100%;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  font-size: 36px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: #5f5f5f;
  transition: all 0.1s ease-in-out;
  text-align: center;

  &:focus,
  &:hover {
    transform: scale(1.05);
    outline: none;
    background-color: #6f6f6f;
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
