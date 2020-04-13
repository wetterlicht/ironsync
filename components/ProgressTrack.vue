<template>
  <div class="progress-track">
    <div class="progress-track__header">
      <text-input
        :value="description"
        class="progress-track__description"
        :is-dark="true"
        @input="$emit('descriptionChange', $event.target.value)"
      />
      <remove-icon class="progress-track__remove" @click="$emit('remove')" />
    </div>
    <div class="progress-track__body">
      <ul class="progress-track__ranks">
        <li
          v-for="rankValue in ranks"
          :key="rankValue"
          class="progress-track__rank"
        >
          <input
            :id="`${id}-${rankValue}`"
            :value="rankValue"
            :name="`${id}-rank`"
            :checked="rankValue === rank"
            type="radio"
            @change="$emit('rankChange', $event.target.value)"
          />
          <label :for="`${id}-${rankValue}`">{{ rankValue }}</label>
        </li>
      </ul>
      <div class="progress-track__progress">
        <progress-box
          v-for="(boxProgress, index) in progress"
          :key="index"
          :progress="boxProgress"
          class="progress-track__box"
          @progressChange="onProgressChange($event, index)"
        ></progress-box>
      </div>
    </div>
  </div>
</template>

<script>
import RemoveIcon from '~/components/RemoveIcon.vue'
import ProgressBox from '~/components/ProgressBox.vue'
import TextInput from '~/components/TextInput.vue'
export default {
  components: {
    ProgressBox,
    RemoveIcon,
    TextInput
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    rank: {
      type: String,
      default: ''
    },
    progress: {
      type: Array,
      default: () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  data() {
    return {
      ranks: ['Troublesome', 'Dangerous', 'Formidable', 'Extreme', 'Epic']
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
.progress-track {
  color: white;
  text-align: center;
  user-select: none;
  border-radius: 4px;
  overflow: hidden;

  .progress-track__header {
    display: flex;
    background-color: #000;
    padding: 15px;
    align-items: center;

    .progress-track__description {
      flex-grow: 1;
      font-family: 'Times New Roman', Times, serif;
      font-size: 18px;
      box-sizing: border-box;
      padding: 5px;
    }

    .progress-track__remove {
      width: 10px;
      height: 10px;
      margin-left: 15px;
    }
  }

  .progress-track__body {
    padding: 5px 15px 25px 15px;
    background-color: #666;

    .progress-track__ranks {
      margin: 10px;
      padding: 0;
      text-indent: 0;
      list-style-type: none;
      .progress-track__rank {
        display: inline-block;
        margin: 0 10px;
        padding: 0;
        text-indent: 0;
        list-style-type: none;
      }
    }

    .progress-track__progress {
      display: flex;
      justify-content: center;

      .progress-track__box {
        padding: 0;
        margin: 5px;
      }
    }
  }
}
</style>
