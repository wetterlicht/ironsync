<template>
  <div class="status-input">
    <div class="status-input__name">{{ name }}</div>
    <number-input
      :value="currentValue"
      :min="min"
      :max="max"
      @input="onValueChange"
    />
  </div>
</template>

<script>
import NumberInput from '~/components/NumberInput.vue'
export default {
  components: {
    NumberInput
  },
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
    onValueChange(event) {
      this.$emit('valueChange', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.status-input {
  text-align: center;

  .status-input__name {
    padding: 0 0 4px 0;
    color: white;
  }
}
</style>
