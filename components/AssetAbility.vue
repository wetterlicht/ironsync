<template>
  <div class="asset-ability">
    <input
      :id="id"
      type="checkbox"
      :checked="active"
      :disabled="!isInteractive"
      @change="onActiveChange"
    />
    <div>
      <label v-if="name" :for="id">{{ name }}</label>
      <asset-block
        :elements="elements"
        :is-interactive="isInteractive"
        @change="onBlockChange"
      ></asset-block>
    </div>
  </div>
</template>

<script>
import AssetBlock from '~/components/AssetBlock.vue'
export default {
  components: {
    AssetBlock
  },
  props: {
    isInteractive: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      required: true
    },
    elements: {
      type: Array,
      required: true
    }
  },
  methods: {
    onActiveChange(event) {
      const ability = {
        name: this.name,
        active: event.target.checked,
        elements: this.elements
      }
      this.$emit('change', ability)
    },
    onBlockChange(block) {
      const ability = {
        name: this.name,
        active: this.active,
        elements: block.elements
      }
      this.$emit('change', ability)
    }
  }
}
</script>

<style lang="scss" scoped>
.asset-ability {
  display: grid;
  grid-template-columns: 18px auto;
}
input[type='checkbox'] {
  margin: 3px 0 0 0;
}
label {
  font-weight: bold;
}
</style>
