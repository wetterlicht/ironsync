<template>
  <div class="bonds-track">
    <div>
      <div class="bonds-track__progress">
        <progress-box
          v-for="(boxProgress, index) in progress"
          :key="index"
          :progress="boxProgress"
          class="bonds-track__box"
          @progressChange="onProgressChange($event, index)"
        ></progress-box>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBox from '~/components/ProgressBox.vue'
export default {
  components: {
    ProgressBox
  },
  props: {
    progress: {
      type: Array,
      default: () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  methods: {
    onProgressChange(value, index) {
      const newArray = [...this.progress]
      newArray.splice(index, 1, value)
      this.$emit('progressChange', newArray)
    }
  }
}
</script>

<style lang="scss" scoped>
.bonds-track {
  text-align: center;
  user-select: none;
  border-radius: 4px;
  overflow: hidden;

  .bonds-track__progress {
    display: flex;
    justify-content: center;

    .bonds-track__box {
      margin: 5px;
    }
  }
}
</style>
