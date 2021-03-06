<template>
  <details class="asset" :open="startOpen" @click="onLoadBody">
    <summary class="header">
      <div class="name">
        {{ name }}
      </div>
      <remove-icon v-if="isInteractive" @remove="$emit('remove')" />
      <base-button v-if="!isInteractive" class="add" @click.stop="$emit('add')"
        >Add</base-button
      >
    </summary>
    <div v-if="loadBody" class="body">
      <div class="type">
        {{ type }}
      </div>
      <asset-block
        v-if="before"
        class="before"
        v-bind="before"
        :is-interactive="isInteractive"
        @change="onBeforeChange"
      ></asset-block>
      <ul class="abilities">
        <li v-for="(ability, index) in abilities" :key="index">
          <asset-ability
            :id="`${name}-${index}`"
            v-bind="ability"
            class="ability"
            :is-interactive="isInteractive"
            @change="onAbilityChange($event, index)"
          ></asset-ability>
        </li>
      </ul>
      <asset-block
        v-if="after"
        class="after"
        v-bind="after"
        :is-interactive="isInteractive"
        @change="onAfterChange"
      ></asset-block>
    </div>
  </details>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import RemoveIcon from '~/components/RemoveIcon.vue'
import AssetAbility from '~/components/AssetAbility.vue'
import AssetBlock from '~/components/AssetBlock.vue'
export default {
  components: {
    AssetBlock,
    BaseButton,
    AssetAbility,
    RemoveIcon
  },
  props: {
    startOpen: {
      type: Boolean,
      default: false
    },
    isInteractive: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    before: {
      type: Object,
      default: null
    },
    abilities: {
      type: Array,
      required: true
    },
    after: {
      type: Object,
      default: null
    }
  },
  data() {
    return { isOpen: this.startOpen, loadBody: false }
  },
  methods: {
    onLoadBody() {
      this.loadBody = true
    },
    onBeforeChange(before) {
      this.$emit('change', {
        name: this.name,
        type: this.type,
        before,
        abilities: this.abilities,
        after: this.after
      })
    },
    onAbilityChange(ability, index) {
      const abilities = [...this.abilities]
      abilities[index] = ability
      this.$emit('change', {
        name: this.name,
        type: this.type,
        before: this.before,
        abilities,
        after: this.after
      })
    },
    onAfterChange(after) {
      this.$emit('change', {
        name: this.name,
        type: this.type,
        before: this.before,
        abilities: this.abilities,
        after
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.asset {
  width: 100%;
  text-align: left;
  border-radius: 4px;
  overflow: hidden;
  background-color: #666;

  .header {
    text-align: left;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    background-color: black;

    .name {
      flex-grow: 1;
      font-weight: bold;
    }

    &:after {
      background: #00c8fa;
    }
  }

  .before {
    padding-top: 1rem;
  }

  .body {
    background-color: #666;
    padding: 10px;
    border-radius: 0 0 4px 4px;
  }

  .abilities {
    list-style-type: none;
    padding: 0;
    margin: 1rem 0 0 0;
  }
}
</style>
