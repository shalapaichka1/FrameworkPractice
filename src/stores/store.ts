// eslint-disable-next-line import/no-unresolved
import { defineStore, mapStores } from 'pinia';

interface IState {
  API: string;
  APIAuthors: string;
  APILocations: string;
  items: any[];
  currentPage: number;
  showDrawer: boolean;
  isDarkTheme: boolean;
  filterInput: string;
  currentArtist: string;
  currentLocations: string;
  currentYearFrom: string;
  currentYearTo: string;
  showResults: boolean;
  clear: boolean;
  limitPage: number;
}
// eslint-disable-next-line import/prefer-default-export
export const useStore = defineStore('storeTS', {
  state: (): IState => ({
    API: `https://test-front.framework.team/paintings?_limit=6`,
    APIAuthors: `https://test-front.framework.team/authors`,
    APILocations: `https://test-front.framework.team/locations`,
    items: [],
    currentPage: 1,
    showDrawer: false,
    isDarkTheme: false,
    filterInput: '',
    currentArtist: '',
    currentLocations: '',
    currentYearFrom: '',
    currentYearTo: '',
    showResults: false,
    clear: true,
    limitPage: 6
  }),
  actions: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    }
  }
});

export default {
  computed: {
    ...mapStores(useStore)
  }
};
