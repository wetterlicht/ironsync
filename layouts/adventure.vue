<template>
  <div class="layout">
    <navigation-bar :title="name">
      <li>
        <nuxt-link
          :to="`/adventures/${adventureId}/characters`"
          class="navigation__link"
          >Characters</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          :to="`/adventures/${adventureId}/progress`"
          class="navigation__link"
          >Progress Tracks</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          :to="`/adventures/${adventureId}/moves`"
          class="navigation__link"
          >Moves</nuxt-link
        >
      </li>
    </navigation-bar>
    <div class="content">
      <nuxt />
    </div>
    <div class="dice">
      <dice-result ref="dice" :result="diceResult" @result="onDiceResult">
      </dice-result>
      <round-button class="dice__button" @click="onDice">
        <img src="/cubes.svg" />
      </round-button>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase'
import NavigationBar from '~/components/NavigationBar.vue'
import RoundButton from '~/components/RoundButton.vue'
import DiceResult from '~/components/DiceResult.vue'
import PageFooter from '~/components/PageFooter.vue'
export default {
  async middleware({ route, redirect }) {
    const docRef = fireDb.collection('adventures').doc(route.params.adventure)
    const docSnapshot = await docRef.get()
    if (!docSnapshot.exists) {
      return redirect('/')
    }
  },
  components: {
    NavigationBar,
    RoundButton,
    DiceResult,
    PageFooter
  },
  data() {
    return {
      diceResult: null,
      name: '',
      unsubscribe: null
    }
  },
  computed: {
    adventureId() {
      return this.$route.params.adventure
    },
    document() {
      return fireDb.collection('adventures').doc(this.adventureId)
    }
  },
  mounted() {
    this.unsubscribe = this.document.onSnapshot((doc) => {
      if (doc.exists) {
        this.diceResult = doc.data().diceResult
        this.name = doc.data().name
      }
    })
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    onDice() {
      this.$refs.dice.roll()
    },
    onDiceResult(diceResult) {
      this.document.update({
        diceResult
      })
    }
  }
}
</script>

<style lang="scss">
html,
body,
#__nuxt,
#__layout {
  height: 100%;
  margin: 0;
  padding: 0;
}

.layout {
  background-color: #8f8f8f;
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .content {
    flex: 1;
    margin-bottom: 100px;
  }
}

.dice {
  display: flex;
  justify-content: right;
  align-items: center;
  position: fixed;
  bottom: 3rem;
  right: 1rem;
}

.dice__button {
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.8);

  img {
    width: 60%;
    height: 60%;
  }
}
</style>
