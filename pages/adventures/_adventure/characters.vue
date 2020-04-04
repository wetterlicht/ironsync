<template>
  <div v-if="loaded" class="characters">
    <character
      v-for="(characterId, index) in characters"
      :id="characterId"
      :key="characterId"
      @remove="removeCharacter($event, index)"
    ></character>
    <base-button class="add" @click="addCharacter">New Character</base-button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { fireDb } from '~/plugins/firebase'
import Character from '~/components/Character.vue'
import BaseButton from '~/components/BaseButton.vue'
export default {
  layout: 'adventure',
  components: {
    Character,
    BaseButton
  },
  data() {
    return {
      loaded: false,
      unsubscribe: null,
      characters: []
    }
  },
  computed: {
    document() {
      return fireDb.collection('adventures').doc(this.$route.params.adventure)
    }
  },
  mounted() {
    this.loaded = false
    this.unsubscribe = this.document.onSnapshot((doc) => {
      if (doc.exists) {
        this.characters = doc.data().characters || []
        this.loaded = true
      }
    })
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    addCharacter() {
      console.log('Add Character')
      this.document.update({
        characters: [...this.characters, uuidv4()]
      })
    },
    removeCharacter(onComplete, index) {
      const characters = [...this.characters]
      characters.splice(index, 1)
      this.document
        .update({
          characters
        })
        .then(onComplete())
        .catch((error) => console.log(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.characters {
  margin: 20px;
  display: grid;
  grid-gap: 2rem;
}
.add {
  margin: 10px auto;
  font-size: 18px;
  padding: 1rem;
}
</style>
