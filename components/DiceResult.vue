<template>
  <div v-if="result" v-show="isVisible" class="dice__result">
    <d6 class="die-icon" />
    <div v-if="result.actionDie" class="die-value">
      {{ result.actionDie }}
    </div>
    <d10 :fill-color="challengeDieIconColor" class="die-icon" />
    <div v-if="result.challengeDie1" :class="challengeDieValueClass">
      {{ result.challengeDie1 }}
    </div>
    <d10 :fill-color="challengeDieIconColor" class="die-icon" />
    <div v-if="result.challengeDie2" :class="challengeDieValueClass">
      {{ result.challengeDie2 }}
    </div>
    <remove-icon class="remove-icon" @click="onHide" />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import D6 from '~/components/D6.vue'
import D10 from '~/components/D10.vue'
import RemoveIcon from '~/components/RemoveIcon.vue'
export default {
  components: {
    D6,
    D10,
    RemoveIcon
  },
  props: {
    result: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      hiddenId: null,
      isVisible: true
    }
  },
  computed: {
    challengeDieIconColor() {
      return this.result.challengeDie1 === this.result.challengeDie2
        ? '#00c8fa'
        : '#fff'
    },
    challengeDieValueClass() {
      return this.result.challengeDie1 === this.result.challengeDie2
        ? 'die-value die-value--doubles'
        : 'die-value'
    }
  },
  watch: {
    result() {
      if (this.hiddenId !== this.result.id) {
        this.isVisible = true
      }
    }
  },
  methods: {
    roll() {
      const id = this.generateID()
      this.lastId = id
      this.$emit('result', {
        id,
        actionDie: this.rollDice(1, 6),
        challengeDie1: this.rollDice(1, 10),
        challengeDie2: this.rollDice(1, 10)
      })
    },
    rollDice(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1))
    },
    generateID() {
      return uuidv4()
    },
    onHide() {
      this.hiddenId = this.result.id
      console.log('Hide', this.hiddenId)
      this.isVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dice__result {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 1rem;
  padding: 5px 1rem;
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.8);

  .die-icon {
    height: 30px;
    margin-right: 5px;
  }

  .die-value {
    width: 20px;

    &.die-value--doubles {
      color: #00c8fa;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .remove-icon {
    margin-left: 10px;
  }
}
</style>
