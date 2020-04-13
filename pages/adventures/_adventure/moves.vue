<template>
  <div class="moves">
    <div class="moves__header">
      <text-input
        :value="searchString"
        placeholder="Search"
        class="moves__search"
        @input="onSearch"
      />
      <div v-for="type in types" :key="type" class="moves__type">
        <input
          :id="type"
          :checked="activeTypes.includes(type)"
          :name="type"
          type="checkbox"
          class="moves__type__checkbox"
          @change="onCheckType($event)"
        />
        <label :for="type">{{ type }}</label>
      </div>
      <base-button class="moves__reset" @click="onResetFilters">
        Clear Filters
      </base-button>
    </div>
    <div
      :class="['moves__list', selectedMove && 'moves__list--open']"
      name="list"
    >
      <move
        v-for="move in moves"
        v-show="isMoveVisible(move.attributes.name, move.attributes.type)"
        :key="move.attributes.name"
        :name="move.attributes.name"
        :component="move.vue.component"
        @selected="onMoveClicked(move.attributes.name, move.attributes.type)"
      ></move>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import TextInput from '~/components/TextInput.vue'
import Move from '~/components/Move.vue'
export default {
  layout: 'adventure',
  components: {
    BaseButton,
    Move,
    TextInput
  },
  asyncData() {
    const resolve = require.context('~/content/markdown/moves', true, /\.md$/)
    const moves = resolve.keys().map((key) => {
      return resolve(key)
    })
    const types = Array.from(
      moves.reduce((set, move) => {
        set.add(move.attributes.type)
        return set
      }, new Set())
    ).sort()
    return {
      moves,
      types
    }
  },
  data() {
    return {
      selectedMove: '',
      searchString: '',
      activeTypes: []
    }
  },
  methods: {
    isMoveVisible(name, type) {
      if (
        this.searchString &&
        !name.toLowerCase().startsWith(this.searchString.toLowerCase())
      ) {
        return false
      }
      if (this.selectedMove && this.selectedMove !== name) {
        return false
      }
      if (this.activeTypes.length > 0 && !this.activeTypes.includes(type)) {
        return false
      }
      return true
    },
    onSearch(event) {
      this.searchString = event.target.value
      this.selectedMove = ''
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
    onMoveClicked(move) {
      if (this.selectedMove) {
        this.selectedMove = ''
      } else {
        this.selectedMove = move
      }
    },
    onResetFilters() {
      this.activeTypes = []
      this.searchString = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.moves {
  padding: 20px;

  .moves__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: -1rem;

    .moves__search {
      font-family: 'Times New Roman', Times, serif;
      margin-right: 1rem;
      width: 150px;
      margin-top: 1rem;
    }

    .moves__reset {
      margin-top: 1rem;
    }

    .moves__type {
      display: flex;
      width: 110px;
      margin-right: 1rem;
      margin-top: 1rem;
      label {
        flex-grow: 1;
        text-align: center;
        display: block;
        font-family: 'Times New Roman', Times, serif;
        font-size: 14px;
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

      .moves__type__checkbox {
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

  .moves__list {
    position: relative;
    margin-top: 2rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, auto));

    &.moves__list--open {
      grid-template-columns: 1fr;
    }
  }
}
</style>
