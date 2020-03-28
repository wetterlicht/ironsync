<template>
  <div class="move">
    <div class="move__name" @click="$emit('selected')">{{ name }}</div>
    <component :is="component" v-show="isOpen" class="move__text"></component>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    component: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
.move {
  overflow: hidden;
  border-radius: 4px;
}
.move__name {
  padding: 10px;
  background-color: #000;
  color: #fff;
  text-align: center;
  user-select: none;

  &:hover {
    background-color: #252525;
  }
}
.move__text {
  padding: 1rem 2rem 2rem 2rem;
  background-color: #4a4a4a;
  color: #fff;

  line-height: 1.5em;
  table {
    border-collapse: collapse;
    text-align: left;
    width: 100%;

    thead {
      border-bottom: 2px solid white;
    }
    tbody tr {
      border-bottom: 1px solid white;
    }
    th {
      padding: 10px 20px;
    }
    td {
      padding: 10px 20px;
    }
  }
  td:first-child {
    max-width: 100%;
    width: 1%;
    white-space: nowrap;
  }
}
</style>
