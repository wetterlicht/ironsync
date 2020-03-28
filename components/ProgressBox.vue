<template>
  <svg
    :class="['progress-box', progress > 0 && `progress-box--${progress}`]"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    version="1.1"
    @click="incrementProgress"
  >
    <rect width="20" height="20" stroke="black" stroke-width="2" fill="none" />
    <line
      class="first-tick"
      x1="0"
      y1="0"
      x2="20"
      y2="20"
      stroke="black"
      stroke-width="1"
    ></line>
    <line
      class="second-tick"
      x1="20"
      y1="0"
      x2="0"
      y2="20"
      stroke="black"
      stroke-width="1"
    ></line>
    <line
      class="third-tick"
      x1="10"
      y1="0"
      x2="10"
      y2="20"
      stroke="black"
      stroke-width="1"
    ></line>
    <line
      class="fourth-tick"
      x1="0"
      y1="10"
      x2="20"
      y2="10"
      stroke="black"
      stroke-width="1"
    ></line>
  </svg>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      maxNumberOfTicks: 4
    }
  },
  methods: {
    incrementProgress() {
      this.$emit(
        'progressChange',
        (this.progress + 1) % (this.maxNumberOfTicks + 1)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-box {
  background-color: #ccc;

  &:hover {
    background-color: #fff;
  }

  .first-tick,
  .second-tick,
  .third-tick,
  .fourth-tick {
    opacity: 0;
  }

  &.progress-box--1 {
    .first-tick {
      opacity: 1;
    }
  }

  &.progress-box--2 {
    .first-tick,
    .second-tick {
      opacity: 1;
    }
  }

  &.progress-box--3 {
    .first-tick,
    .second-tick,
    .third-tick {
      opacity: 1;
    }
  }

  &.progress-box--4 {
    .first-tick,
    .second-tick,
    .third-tick,
    .fourth-tick {
      opacity: 1;
    }
  }
}
</style>
