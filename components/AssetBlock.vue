<template>
  <div>
    <div v-for="(element, index) in elements" :key="index">
      <vue-showdown
        v-if="element.type === 'text'"
        :markdown="element.text"
        class="markdown"
      />
      <div v-else-if="element.type === 'text-value'">
        <text-input
          :placeholder="element.name"
          :value="element.value"
          :disabled="!isInteractive"
          @input="onChange($event, index)"
        />
      </div>
      <div v-else-if="element.type === 'number-value'">
        <label
          >{{ element.name }}:&nbsp;
          <number-input
            :value="element.value"
            :min="element.min"
            :max="element.max"
            :disabled="!isInteractive"
            @change="onChange($event, index)"
        /></label>
      </div>
    </div>
  </div>
</template>

<script>
import { VueShowdown } from 'vue-showdown'
import NumberInput from '~/components/NumberInput.vue'
import TextInput from '~/components/TextInput.vue'
export default {
  components: {
    NumberInput,
    TextInput,
    VueShowdown
  },
  props: {
    isInteractive: {
      type: Boolean,
      default: true
    },
    elements: {
      type: Array,
      required: true
    }
  },
  methods: {
    onChange(event, index) {
      const elements = [...this.elements]
      const element = elements[index]
      element.value = event.target.value
      this.$emit('change', { elements })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .markdown {
  p {
    margin: 0;
  }
}
</style>
