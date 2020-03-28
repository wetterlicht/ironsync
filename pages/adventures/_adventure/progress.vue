<template>
  <div v-if="loaded" class="tracks">
    <ul>
      <li v-for="(track, index) in tracks" :key="index" class="track">
        <progress-track
          :id="index"
          :description="track.description"
          :rank="track.rank"
          :progress="track.progress"
          @remove="onRemoveTrack(index)"
          @rankChange="onRankChange($event, index)"
          @descriptionChange="onDescriptionChange($event, index)"
          @progressChange="onProgressChange($event, index)"
        ></progress-track>
      </li>
    </ul>
    <round-button class="add" @click="addTrack">+</round-button>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase'
import ProgressTrack from '~/components/ProgressTrack.vue'
import RoundButton from '~/components/RoundButton.vue'
export default {
  layout: 'adventure',
  components: {
    RoundButton,
    ProgressTrack
  },
  data() {
    return {
      loaded: false,
      unsubscribe: null,
      tracks: []
    }
  },
  computed: {
    document() {
      return fireDb.collection('progress').doc(this.$route.params.adventure)
    }
  },
  mounted() {
    this.loaded = false
    this.unsubscribe = this.document.onSnapshot((doc) => {
      if (doc.exists) {
        this.tracks = doc.data().tracks
      }
      this.loaded = true
    })
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    addTrack() {
      this.document.update({
        tracks: [...this.tracks, {}]
      })
    },
    onRemoveTrack(index) {
      const newTracks = [...this.tracks]
      newTracks.splice(index, 1)
      this.document.update({
        tracks: newTracks
      })
    },
    onDescriptionChange(value, index) {
      this.tracks[index].description = value
      this.document.update({
        tracks: this.tracks
      })
    },
    onRankChange(value, index) {
      this.tracks[index].rank = value
      this.document.update({
        tracks: this.tracks
      })
    },
    onProgressChange(value, index) {
      this.tracks[index].progress = value
      this.document.update({
        tracks: this.tracks
      })
    }
  }
}
</script>

<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;
}

.tracks {
  margin-top: 20px auto;

  .track {
    color: #fff;
    background-color: #4a4a4a;
    margin: 20px;
    text-align: right;
    border-radius: 4px;
  }

  .add {
    margin: 10px auto;
  }
}
</style>
