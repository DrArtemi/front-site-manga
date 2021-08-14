<template>
  <div class="flex-auto">
    <Slider
      v-if="authStatus && favorites"
      class="mt-2 mb-4 md:mt-8 ml-2 lg:ml-4 mr-2 lg:mr-4"
      name="Favoris"
      :sliderData="favorites"
      type="chapter"
      @search="updateSearchTextFavorite"
    />
    <Slider
      class="mb-4 md:mt-8 ml-2 lg:ml-4 mr-2 lg:mr-4"
      :class="{ 'mt-8': authStatus && favorites, 'mt-2': !authStatus || !favorites }"
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
import { mapGetters } from 'vuex'
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
      searchTextManga: '',
      searchTextFavorite: ''
    }
  },
  methods: {
    updateSearchTextChapter: function(searchText) {
      this.searchTextChapter = searchText;
    },
    updateSearchTextManga: function(searchText) {
      this.searchTextManga = searchText;
    },
    updateSearchTextFavorite: function(searchText) {
      this.searchTextFavorite = searchText;
    }
  },
  computed: {
    ...mapGetters(['user', 'authStatus']),
    mangaIds: function() {
      if (this.authStatus) {
        let mangas = this.user.mangas;
        return this.user.mangas.map(manga => manga.id);
      } else {
        return [];
      }
    }
  },
  apollo: {
    favorites: {
      query: gql`query favorites($mangaIds: [Int!]!, $searchText: String!) {
        favorites: userChapters(first: 50, mangaIds: $mangaIds, searchText: $searchText) {
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
          mangaIds: this.mangaIds,
          searchText: this.searchTextFavorite
        };
      }
    },
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