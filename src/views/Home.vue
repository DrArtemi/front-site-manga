<template>
  <div class="flex-auto">
    <!-- Si on est connecté slider mes chapitres -->
    <Slider
      class="mt-2 mb-4 md:mt-8 ml-2 lg:ml-4 mr-2 lg:mr-4"
      name="Chapitres"
      :sliderData="chapters"
      type="chapter"
      @search="updateSearchTextChapter"
    />
    <Slider
      class="mt-8 mb-4 ml-2 lg:ml-4 mr-2 lg:mr-4"
      name="Mangas"
      :sliderData="mangas"
      type="manga"
      @search="updateSearchTextManga"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Slider from '../components/Slider.vue'

export default {
  name: 'Home',
  components: {
    Slider,
  },
  data() {
    return {
      mangas: '',
      chapters: '',
      searchTextChapter: '',
      searchTextManga: ''
    }
  },
  methods: {
    updateSearchTextChapter: function(searchText) {
      this.searchTextChapter = searchText;
    },
    updateSearchTextManga: function(searchText) {
      this.searchTextManga = searchText;
    }
  },
  apollo: {
    mangas: {
      query: gql`query mangas($searchText: String!) {
        mangas: allMangas(first: 50, searchText: $searchText) {
          id
          title
          team
          url
          cover_path
        }
      }`,
      variables() {
        return {
          searchText: this.searchTextManga
        };
      }
    },
    chapters: {
      query: gql`query chapters($searchText: String!) {
        chapters: allChapters(first: 50, searchText: $searchText) {
          id
          title
          number
          url
          date
          manga {
            id
            title
            team
            cover_path
          }
        }
      }`,
      variables() {
        return {
          searchText: this.searchTextChapter
        };
      }
    }
  }
}

</script>

<style>
</style>