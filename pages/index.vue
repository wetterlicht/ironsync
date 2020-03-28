<template>
  <div class="call">
    <h1 class="title">Looking for someone to share in an adventure?</h1>
    <form @submit.prevent="createAdventure">
      <input
        v-model="adventureName"
        type="text"
        placeholder="Name your tale..."
        class="name"
        required
      />
      <button ref="createButton" class="button">
        I think I'm quite ready.
      </button>
    </form>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase'
export default {
  data() {
    return {
      adventureName: ''
    }
  },
  methods: {
    async createAdventure() {
      try {
        this.$refs.createButton.disabled = true
        const documentReference = await fireDb.collection('adventures').add({
          name: this.adventureName
        })
        const createdId = documentReference.id
        this.$router.push(`/adventures/${createdId}`)
      } catch (error) {
        console.log(error)
        this.$refs.createButton.disabled = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.call {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
}

.name {
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
  box-sizing: border-box;
  padding: 5px;
}

.button {
  display: flex;
  font-family: 'Times New Roman', Times, serif;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
  border: 0;
  border-radius: 4px;
  white-space: nowrap;
  margin: 1rem auto;
  padding: 0 1rem;
  font-size: 18px;
  line-height: 30px;
  background-color: #4a4a4a;
  transition: all 0.1s ease-in-out;
  text-align: center;

  &:focus:enabled,
  &:hover:enabled {
    transform: scale(1.05);
    outline: none;
    background-color: #5f5f5f;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background-color: #ccc;
    color: #888;
  }
}
</style>
