<template>
  <div class="asset-selection">
    <button
      :class="[
        'asset-selection__title',
        isOpen && 'asset-selection__title--active'
      ]"
      tabindex="0"
      @click="toggleOpen()"
    >
      {{ isOpen ? 'Close' : 'Add Assets' }}
    </button>
    <div v-if="isOpen">
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
            :id="type"
            :checked="activeTypes.includes(type)"
            :name="type"
            type="checkbox"
            class="asset-selection_type-checkbox"
            @change="onCheckType($event)"
          />
          <label :for="type">{{ type }}</label>
        </div>
        <button class="asset-selection__reset" @click="onResetFilters">
          Reset All Filters
        </button>
      </div>
      <div class="asset-selection__grid">
        <div
          v-for="asset in availableAssets"
          v-show="isAssetVisible(asset.name, asset.type)"
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
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/TextInput.vue'
import Asset from '~/components/Asset.vue'
export default {
  components: {
    Asset,
    TextInput
  },
  props: {
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
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    isAssetVisible(name, type) {
      if (
        this.searchString &&
        !name.toLowerCase().startsWith(this.searchString.toLowerCase())
      ) {
        return false
      }
      if (this.activeTypes.length > 0 && !this.activeTypes.includes(type)) {
        return false
      }
      return true
    },
    onCheckType(event) {
      if (event.target.checked === true) {
        this.activeTypes.push(event.target.name)
      } else {
        this.activeTypes = this.activeTypes.filter(
          (type) => type !== event.target.name
        )
      }
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
  text-align: center;

  .asset-selection__title {
    padding: 1rem;
    position: relative;
    background: black;
    text-align: center;
    border: none;
    color: white;
    font-family: 'Times New Roman', Times, serif;
    font-size: 16px;
    border-radius: 4px;

    &:hover,
    &:focus {
      outline: none;
      background-color: #333;
    }

    &.asset-selection__title--active {
      width: 100%;
      &:before {
        content: ' ';
        width: 0px;
        height: 0px;
        border-top: 16px solid black;
        border-right: 24px solid transparent;
        border-bottom: 16px solid transparent;
        border-left: 24px solid transparent;
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -24px;
      }

      &:hover,
      &:focus {
        &:before {
          border-top-color: #333;
        }
      }
    }
  }

  .asset-selection__header {
    background-color: #757575;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 16px;
    align-items: center;
    padding: 2rem 15px;

    .asset-selection__search {
      font-family: 'Times New Roman', Times, serif;
      font-size: 18px;
      padding: 5px;
    }

    .asset-selection__type {
      label {
        display: block;
        font-family: 'Times New Roman', Times, serif;
        font-size: 18px;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #ccc;
        padding: 7px 1rem;
        background-color: #4f4f4f;

        &:hover {
          color: #fff;
          background-color: black;
        }
      }

      .asset-selection_type-checkbox {
        display: none;

        &:checked + label {
          color: #fff;
          background-color: #000;
          border: 1px solid #00c8faa8;
        }
      }
    }

    .asset-selection__reset {
      text-align: left;
      cursor: pointer;
      font-family: 'Times New Roman', Times, serif;
      font-size: 18px;
      border: 0;
      outline: none;
      border-radius: 4px;
      color: #ccc;
      background: none;

      &:hover {
        color: #fff;
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
