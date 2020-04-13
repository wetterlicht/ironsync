<template>
  <details class="asset-selection">
    <summary class="asset-selection__summary">Add Assets</summary>
    <div class="asset-selection__header">
      <text-input
        :value="searchString"
        placeholder="Search"
        type="text"
        class="asset-selection__search"
        @input="onSearch"
      />
      <div v-for="type in types" :key="type" class="asset-selection__type">
        <input
          :id="`${id}-${type}`"
          :checked="activeTypes.includes(type)"
          :name="type"
          type="checkbox"
          class="asset-selection__type__checkbox"
          @change="onCheckType($event)"
        />
        <label :for="`${id}-${type}`">{{ type }}</label>
      </div>
      <base-button class="asset-selection__reset" @click="onResetFilters">
        Clear Filters
      </base-button>
    </div>
    <div class="asset-selection__grid">
      <div
        v-for="asset in filteredAssets"
        :key="asset.name"
        class="asset-wrapper"
      >
        <asset
          v-bind="asset"
          :is-interactive="false"
          @add="$emit('selected', asset)"
        ></asset>
      </div>
    </div>
  </details>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import TextInput from '~/components/TextInput.vue'
import Asset from '~/components/Asset.vue'
export default {
  components: {
    Asset,
    BaseButton,
    TextInput
  },
  props: {
    id: {
      type: String,
      required: true
    },
    availableAssets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      searchString: '',
      activeTypes: []
    }
  },
  computed: {
    types() {
      return Array.from(
        this.availableAssets.reduce((set, asset) => {
          set.add(asset.type)
          return set
        }, new Set())
      ).sort()
    },
    filteredAssets() {
      console.log('runFilter')
      const result = this.availableAssets.filter((asset) => {
        if (
          this.searchString &&
          !asset.name.toLowerCase().startsWith(this.searchString.toLowerCase())
        ) {
          return false
        }
        if (
          this.activeTypes.length > 0 &&
          !this.activeTypes.includes(asset.type)
        ) {
          return false
        }
        return true
      })
      console.log(result.length)
      return result
    }
  },
  watch: {
    activeTypes(value) {
      console.log('ActiveTypes', value)
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    onCheckType(event) {
      if (event.target.checked === true) {
        this.activeTypes.push(event.target.name)
      } else {
        this.activeTypes = this.activeTypes.filter(
          (type) => type !== event.target.name
        )
      }
      console.log(this.activeTypes.length)
    },
    onResetFilters() {
      this.activeTypes = []
      this.searchString = ''
    },
    onSearch(event) {
      this.searchString = event.target.value
      this.selectedMove = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.asset-wrapper {
  width: 100%;
  .asset {
    height: 100%;
    width: 100%;
  }
}

.asset-selection {
  border-radius: 4px;
  overflow: hidden;
  padding-top: 1rem;

  .asset-selection__summary {
    text-align: left;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    background-color: black;
  }

  .asset-selection__header {
    background-color: #757575;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 16px;
    align-items: center;
    padding: 2rem 15px;

    .asset-selection__type {
      display: flex;
      label {
        flex-grow: 1;
        text-align: center;
        display: block;
        font-family: 'Times New Roman', Times, serif;
        font-size: 16px;
        border: 1px solid transparent;
        border-radius: 50px;
        color: #ccc;
        padding: 7px 1rem;
        background-color: #4a4a4a;

        &:hover {
          color: #fff;
          background-color: black;
        }
      }

      .asset-selection__type__checkbox {
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;

        &:focus + label {
          background-color: #000;
          color: #fff;
        }

        &:checked + label {
          background-color: #000;
          color: #00c8fa;
        }
      }
    }
  }

  .asset-selection__grid {
    background-color: #757575;
    padding: 1rem 15px 1rem 15px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    justify-items: center;
  }
}
</style>
