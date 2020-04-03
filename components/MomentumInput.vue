<template>
  <div class="momentum-input">
    <div>
      <div class="momentum-input__name">Momentum</div>
      <number-input
        :value="currentValue"
        :min="min"
        :max="max"
        @input="onValueChange"
      />
    </div>
    <div>
      <div class="momentum-input__name">Max</div>
      <number-input :value="max" :min="-6" :max="10" @input="onMaxChange" />
    </div>
    <div>
      <div class="momentum-input__name">Reset</div>
      <number-input :value="reset" :min="-6" :max="10" @input="onResetChange" />
    </div>
  </div>
</template>

<script>
import NumberInput from '~/components/NumberInput.vue'
export default {
  components: {
    NumberInput
  },
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
      default: 10
    },
    reset: {
      type: Number,
      default: 2
    }
  },
  methods: {
    onValueChange(event) {
      this.$emit('valueChange', event.target.value)
    },

    onMaxChange(event) {
      this.$emit('maxChange', event.target.value)
    },

    onResetChange(event) {
      this.$emit('resetChange', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.momentum-input {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  text-align: center;

  .momentum-input__name {
    padding: 0 0 4px 0;
    color: white;
  }
}
</style>
