<script setup lang="ts">
// eslint-disable-next-line import/extensions, import/no-unresolved
import { useStore } from '../stores/store';
</script>

<script lang="ts">
export default {
  data() {
    return {
      showDrawer: false,
      theme: true,
      inputText: ''
    };
  },
  methods: {
    toggleTheme() {
      useStore().isDarkTheme = !useStore().isDarkTheme;
    },
    inputFilter(event: any) {
      useStore().filterInput = event.target.value;
    },
    changeTheme() {
      if (useStore().isDarkTheme === true) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
      useStore().isDarkTheme = !useStore().isDarkTheme;
    }
  }
};
</script>

<template>
  <header>
    <img v-if="!useStore().isDarkTheme" class="logo" src="../../public/logo.svg" alt="" />
    <img v-else class="logo" src="../../public/logo-light-theme.svg" alt="" />
    <img
      v-if="!useStore().isDarkTheme"
      @mouseup="changeTheme"
      class="theme"
      src="../../public/sun.svg"
      alt=""
    />
    <img v-else @mouseup="changeTheme" class="theme" src="../../public/moon.svg" alt="" />
  </header>
  <div class="filter">
    <img
      v-if="!useStore().isDarkTheme"
      :class="!useStore().isDarkTheme"
      id="search"
      src="../../public/search.svg"
      alt=""
    />
    <img v-else id="search" src="../../public/search-light-theme.svg" alt="" />
    <input
      :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'"
      @input="inputFilter"
      id="inputLabel"
      aria-label="Painting title"
      placeholder="Painting title"
    />
    <img
      v-if="!useStore().isDarkTheme"
      @mouseup="useStore().toggleDrawer"
      id="settings"
      src="../../public/settings.svg"
      alt=""
    />
    <img
      v-else
      @mouseup="useStore().toggleDrawer"
      id="settings"
      src="../../public/settings-light-theme.svg"
      alt=""
    />
  </div>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#search {
  position: relative;
  left: 36px;
}

#settings {
  position: relative;
  width: 36px;
  height: 36px;
  padding: 8px;
  top: 0px;
}
</style>
