<template>
  <div class="momentum-input">
    <div class="momentum-input__name">Momentum</div>
    <div class="momentum-input__stepper">
      <button :class="decrementButtonClass" @click="onDecrement">
        -
      </button>
      <div class="momentum-input__stepper__value">
        {{ formatValue(currentValue) }}
      </div>
      <button :class="incrementButtonClass" @click="onIncrement">
        +
      </button>
    </div>
    <Button class="momentum-input__reset" @click="onReset">Reset</Button>
  </div>
</template>

<script>
export default {
  props: {
    currentValue: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: -6
    },
    max: {
      type: Number,
      required: true
    },
    reset: {
      type: Number,
      required: true
    }
  },
  computed: {
    incrementButtonClass() {
      return [
        'momentum-input__stepper__button',
        this.currentValue === this.max &&
          'momentum-input__stepper__button--disabled'
      ]
    },
    decrementButtonClass() {
      return [
        'momentum-input__stepper__button',
        this.currentValue === 0 && 'momentum-input__stepper__button--disabled'
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
    onReset() {
      this.isOpen = false
      this.$emit('reset')
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
.momentum-input {
  border: 1px solid black;

  .momentum-input__name {
    padding: 8px 0;
    background-color: black;
    color: white;
    text-transform: uppercase;
    text-align: center;
  }
  .momentum-input__stepper {
    display: flex;
    text-align: center;

    .momentum-input__stepper__button {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4a4a4a;
      color: white;
      border: none;
      cursor: pointer;

      &.momentum-input__stepper__button--disabled {
        background-color: #ddd;
        color: gray;
        cursor: default;
      }
    }

    .momentum-input__stepper__value {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .momentum-input__reset {
    font-family: 'Times New Roman', Times, serif;
    width: 100%;
    height: 30px;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: #4a4a4a;
    border-top: 1px solid black;
    border-bottom: none;
    border-left: none;
    border-right: none;
    cursor: pointer;
    text-transform: uppercase;
  }
}
</style>
