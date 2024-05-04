<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

import TheWelcome from './components/TheWelcome.vue';
import HelloWorld from './components/HelloWorld.vue';
import WelcomeItem from './components/WelcomeItem.vue';

// eslint-disable-next-line import/extensions, import/no-unresolved
import { useStore } from './stores/store';

// eslint-disable-next-line vue/no-dupe-keys
const items: any = ref([]);

const fetchFilters = async () => {
  try {
    const { data } = await axios.get(useStore().API);
    items.value = data;
  } catch {
    // eslint-disable-next-line no-console
    console.log('Error');
  }
};

onMounted(fetchFilters);

watch(
  () => [
    // useStore().currentArtist,
    // useStore().currentLocations,
    // useStore().filterInput,
    // useStore().currentYearFrom,
    // useStore().currentYearTo,
    // useStore().currentPage

    useStore().showResults,
    useStore().clear,
    useStore().currentPage,
    useStore().filterInput
  ],
  async () => {
    try {
      const params: { [key: string]: string } = {};

      if (useStore().currentArtist) {
        params.authorId = useStore().currentArtist;
      }
      if (useStore().currentLocations) {
        params.locationID = useStore().currentLocations;
      }
      if (useStore().filterInput) {
        params.q = useStore().filterInput;
      }
      if (useStore().currentYearFrom) {
        params.created_gte = useStore().currentYearFrom;
      }
      if (useStore().currentYearTo) {
        params.created_lte = useStore().currentYearTo;
      }

      const { data } = await axios.get(`${useStore().API}&_page=${useStore().currentPage}`, {
        params
      });
      if (useStore().currentLocations) {
        items.value = data.filter((item: any) => item.locationId === useStore().currentLocations); // добавил фильтр на стороне пользователя, ибо сама апишка начинает ругаться
      } else {
        items.value = data;
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error');
    }
  }
);
</script>

<template>
  <div>
    <header>
      <HelloWorld />
    </header>

    <main>
      <div class="galery-main" v-if="items.length > 0">
        <TheWelcome
          v-for="item in items"
          v-bind:key="item.id"
          :pictureYear="item.created"
          :pictureTitle="item.name"
          :artistName="item.author"
          :locationName="item.location"
          :pictureURL="`https://test-front.framework.team/${item.imageUrl}`"
        />
      </div>
      <div v-else class="noSearhResults">
        <p id="main-title">
          No matches for <b>{{ useStore().filterInput }}</b>
        </p>
        <p id="description">Please try again with a different spelling or keywords.</p>
      </div>
      <WelcomeItem />
    </main>
  </div>
  <div class="pagination" :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'">
    <button type="button" @click="changePage(currentPage - 1)">&lt;</button>
    <button
      type="button"
      v-for="pageNumber in pages"
      :key="pageNumber"
      :disabled="pageNumber === currentPage"
      @click="changePage(pageNumber)"
    >
      <span v-if="pageNumber === currentPage">{{ pageNumber }}</span>
      <span v-else-if="pageNumber === currentPage + 2">...</span>
      <span v-else-if="pageNumber === currentPage + 4"></span>
      <span v-else-if="pageNumber === currentPage - 2">...</span>
      <span v-else-if="pageNumber === currentPage - 4"></span>
      <span v-else>{{ pageNumber }}</span>
    </button>
    <button type="button" @click="changePage(currentPage + 1)">&gt;</button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      rows: 100,
      filterInput: ref(''),
      isDarkTheme: useStore().isDarkTheme,
      currentPage: useStore().currentPage,
      pages: 6,
      isVisible: false
    };
  },
  methods: {
    changePage(page: number) {
      if (page > 0 && page < this.pages + 1) {
        this.currentPage = page;
        useStore().currentPage = page;
      }
    }
  }
};
</script>
