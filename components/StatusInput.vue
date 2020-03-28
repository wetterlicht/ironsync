<template>
  <div class="status-input">
    <div class="status-input__name">{{ name }}</div>
    <div class="status-input__stepper">
      <button :class="decrementButtonClass" @click="onDecrement">
        -
      </button>
      <div class="status-input__stepper__value">
        {{ formatValue(currentValue) }}
      </div>
      <button :class="incrementButtonClass" @click="onIncrement">
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    currentValue: {
      type: Number,
      required: true
    }
  },
  computed: {
    incrementButtonClass() {
      return [
        'status-input__stepper__button',
        this.currentValue === this.max &&
          'status-input__stepper__button--disabled'
      ]
    },
    decrementButtonClass() {
      return [
        'status-input__stepper__button',
        this.currentValue === 0 && 'status-input__stepper__button--disabled'
      ]
    }
  },
  methods: {
    onIncrement() {
      if (this.currentValue < this.max) {
        this.$emit('valueChange', this.currentValue + 1)
      }
    },
    onDecrement(value) {
      if (this.currentValue > this.min) {
        this.$emit('valueChange', this.currentValue - 1)
      }
    },
    formatValue(value) {
      if (value > 0) {
        return `+ ${value}`
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
.status-input {
  .status-input__name {
    padding: 8px 0;
    background-color: black;
    color: white;
    text-transform: uppercase;
    text-align: center;
    border: 1px solid black;
  }
  .status-input__stepper {
    display: flex;
    text-align: center;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;

    .status-input__stepper__button {
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4a4a4a;
      color: white;
      border: none;
      cursor: pointer;

      &.status-input__stepper__button--disabled {
        background-color: #ddd;
        color: gray;
        cursor: default;
      }
    }

    .status-input__stepper__value {
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
