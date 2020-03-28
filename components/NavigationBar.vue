<template>
  <div>
    <div class="header">
      <h1>
        <nuxt-link to="/" class="logo">
          Iron<span class="sync">Sync</span></nuxt-link
        >
      </h1>
      <h1 class="title">
        {{ title }}
      </h1>
      <nav>
        <ul class="navigation">
          <slot></slot>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 30px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  margin: 10px 0;
  text-decoration: none;

  .sync {
    color: #00c8fa;
  }
}

.title {
  font-weight: bold;
  color: white;
  margin: 10px 0;
  text-decoration: none;
}

.navigation {
  display: flex;
  justify-content: right;
  padding: 0;
  margin: 0;

  li {
    margin: 0 0 0 30px;
    padding: 0;
    text-indent: 0;
    list-style-type: none;
    text-indent: 0;
    list-style-type: none;
  }
  .navigation__link {
    color: #ccc;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }

  .navigation__link.nuxt-link-active {
    color: #00c8fa;
  }
}
</style>
