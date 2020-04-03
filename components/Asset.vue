<template>
  <div class="asset">
    <div class="header">
      <div class="type">
        {{ type }}
      </div>
      <remove-icon v-if="isInteractive" @click="$emit('remove')" />
      <base-button v-if="!isInteractive" class="add" @click="$emit('add')"
        >Add</base-button
      >
    </div>
    <div class="body">
      <div class="name">
        {{ name }}
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
  </div>
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
  methods: {
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
  width: 300px;
  text-align: left;

  border-radius: 4px;
  overflow: hidden;

  .header {
    text-align: center;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
  }

  /deep/ .before {
    padding-top: 1rem;
    .markdown {
      margin: 1rem 0;
    }
  }

  .type {
    text-transform: uppercase;
  }

  .body {
    background-color: #666;
    padding: 10px;
    border-radius: 0 0 4px 4px;
  }

  .name {
    text-transform: uppercase;
    font-weight: bold;
  }

  .abilities {
    list-style-type: none;
    padding: 0;
    margin: 1rem 0;

    .ability {
      padding-bottom: 1rem;
    }
  }
}
</style>
