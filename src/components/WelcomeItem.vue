<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

// eslint-disable-next-line import/extensions, import/no-unresolved
import { useStore } from '../stores/store';

const storeTS = useStore();
const items: any = ref([]);
const artists: any = ref([]);
const locations: any = ref([]);
const currentArtist = ref('');
const currentLocations = ref('');
const artistsAPI = ref(`https://test-front.framework.team/authors/`);
const locationAPI = ref(`https://test-front.framework.team/locations/`);

onMounted(async () => {
  try {
    const { data: dataArtists } = await axios.get(artistsAPI.value);
    const { data: dataLocations } = await axios.get(locationAPI.value);
    artists.value = dataArtists;
    locations.value = dataLocations;
  } catch {
    // eslint-disable-next-line no-console
    console.log('Error');
  }
});

watch(currentArtist, async () => {
  try {
    const { data } = await axios.get(
      `https://test-front.framework.team/authors?name=${currentArtist.value}`
    );
    items.value = data[0].id;
    useStore().currentArtist = data[0].id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
});

watch(currentLocations, async () => {
  try {
    const { data } = await axios.get(
      `https://test-front.framework.team/locations?location=${currentLocations.value}`
    );
    items.value = data[0].id;
    useStore().currentLocations = data[0].id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
});

const onChangeSelectAuthors = (event: any) => {
  currentArtist.value = event.target.value;
};

const onChangeSelectLocations = (event: any) => {
  currentLocations.value = event.target.value;
};

const onChangeInputFrom = (event: any) => {
  useStore().currentYearFrom = event.target.value;
};

const onChangeInputTo = (event: any) => {
  useStore().currentYearTo = event.target.value;
};
</script>

<script lang="ts">
export default {
  data() {
    return {
      showArtistFilter: false,
      showLocationFilter: false,
      showYearFilter: false,
      plusSRC: '../../public/plus.svg',
      plusLightThemeSRC: '../../public/plus-light-theme.svg',
      minusSRC: '../../public/minus.svg',
      minusLightThemeSRC: '../../public/minus-light-theme.svg'
    };
  },
  methods: {
    clearAllFilters() {
      if (useStore().clear === false) {
        useStore().currentArtist = '';
        useStore().currentLocations = '';
        useStore().filterInput = '';
        useStore().currentYearFrom = '';
        useStore().currentYearTo = '';
        useStore().currentPage = 1;
        const input = document.getElementById('inputLabel') as HTMLInputElement;
        input.value = '';

        useStore().clear = true;
      }
    },
    showResultsButton() {
      useStore().clear = !useStore().clear;
    }
  }
};
</script>

<template>
  <div
    :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'"
    v-if="storeTS.showDrawer ? true : false"
    class="filter-body"
  >
    <img
      v-if="!useStore().isDarkTheme"
      @mouseup="storeTS.showDrawer = !storeTS.showDrawer"
      id="cancel-button"
      src="../../public/cancel.svg"
      alt="x"
    />
    <img
      v-else
      @mouseup="storeTS.showDrawer = !storeTS.showDrawer"
      id="cancel-button"
      src="../../public/cancel-light-theme.svg"
      alt="x"
    />

    <div class="filter-artist filter-category">
      <div class="filter-artist-header filter-headers">
        <p>artist</p>
        <img
          v-if="!useStore().isDarkTheme"
          @mouseup="showArtistFilter = !showArtistFilter"
          :src="showArtistFilter ? './../../public/minus.svg' : './../../public/plus.svg'"
          alt="+"
        />
        <img
          v-else
          @mouseup="showArtistFilter = !showArtistFilter"
          :src="showArtistFilter ? minusLightThemeSRC : plusLightThemeSRC"
          alt="+"
        />
      </div>
      <div v-if="showArtistFilter ? true : false" class="filter-input artist-input">
        <select
          :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'"
          name="select-artists"
          id="select-artists"
          v-model="currentArtist"
          @change="onChangeSelectAuthors"
        >
          <option value="" selected disabled>Select the author</option>
          <option v-for="item in artists" v-bind:key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="filter-location filter-category">
      <div class="filter-location-header filter-headers">
        <p>location</p>
        <img
          v-if="!useStore().isDarkTheme"
          @mouseup="showLocationFilter = !showLocationFilter"
          :src="showLocationFilter ? minusSRC : plusSRC"
          alt="+"
        />
        <img
          v-else
          @mouseup="showLocationFilter = !showLocationFilter"
          :src="showLocationFilter ? minusLightThemeSRC : plusLightThemeSRC"
          alt="+"
        />
      </div>
      <div v-if="showLocationFilter ? true : false" class="filter-input locations-input">
        <select
          :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'"
          name="select-locations"
          id="select-locations"
          v-model="currentLocations"
          @change="onChangeSelectLocations"
        >
          <option value="" selected disabled>Select the location</option>
          <option v-for="item in locations" v-bind:key="item.id">
            {{ item.location }}
          </option>
        </select>
      </div>
    </div>

    <div class="filter-year filter-category">
      <div class="filter-year-header filter-headers">
        <p>year</p>
        <img
          v-if="!useStore().isDarkTheme"
          @mouseup="showYearFilter = !showYearFilter"
          :src="showYearFilter ? minusSRC : plusSRC"
          alt="+"
        />
        <img
          v-else
          @mouseup="showYearFilter = !showYearFilter"
          :src="showYearFilter ? minusLightThemeSRC : plusLightThemeSRC"
          alt="+"
        />
      </div>

      <div v-if="showYearFilter ? true : false" class="filter-input year-inputs">
        <input
          :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'"
          @input="onChangeInputFrom"
          v-model="useStore().currentYearFrom"
          class="year-inputs"
          id="fromInpit"
          maxlength="4"
          aria-label="yearFrom-inputs"
          placeholder="From"
          min="0"
        />
        <p>&mdash;</p>
        <input
          :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'"
          @input="onChangeInputTo"
          v-model="useStore().currentYearTo"
          class="year-inputs"
          id="toInpit"
          maxlength="4"
          aria-label="yearTo-inputs"
          placeholder="To"
          min="0"
        />
      </div>
    </div>

    <div
      class="filter-footer filter-headers"
      :class="!useStore().isDarkTheme ? 'dark-theme' : 'light-theme'"
    >
      <p @mousedown="showResultsButton" class="drawer-footer-buttons" id="show-the-results">
        show the results
      </p>
      <p @mouseup="clearAllFilters" class="drawer-footer-buttons" id="clear-button">clear</p>
    </div>
  </div>
</template>
