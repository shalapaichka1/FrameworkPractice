<script setup lang="ts">
// eslint-disable-next-line import/extensions, import/no-unresolved
import { useStore } from '../stores/store';

defineProps({
  pictureURL: {
    type: String,
    default: ''
  },
  pictureTitle: {
    type: String,
    default: ''
  },
  pictureYear: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="content" :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'">
    <div class="content-item">
      <img class="picture" :src="pictureURL" alt="Picture" />

      <div class="title">
        <div class="lot1" :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'">
          <p id="lotName">{{ pictureTitle }}</p>
          <p id="lotYear">{{ pictureYear }}</p>
        </div>

        <div class="lot2"><p>&rightarrow;</p></div>
        <div class="lot3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
export default {
  data() {
    return {
      isDarkTheme: true
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    }
  }
};
</script>
