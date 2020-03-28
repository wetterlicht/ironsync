<template>
  <div class="ability-block">
    <div class="ability-block__value">
      <span class="ability-block__value__label">{{ value }}</span>
    </div>
    <div class="ability-block__name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ability-block {
  border: 1px solid black;
  width: 80px;
  display: flex;
  flex-direction: column;

  .ability-block__name {
    padding: 8px 0;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.4em;
  }

  .ability-block__value {
    padding-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .ability-block__value__label {
      color: black;
      font-size: 26px;
      font-weight: 500;
      text-align: center;
      line-height: 1.4em;
    }
  }
}
</style>
