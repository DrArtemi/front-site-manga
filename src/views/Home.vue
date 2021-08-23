<template>
  <div class="flex-auto">
    <Message
      v-if="!authStatus"
      class="mt-2 mb-4 md:mt-8 ml-2 lg:ml-4 mr-2 lg:mr-4"
      message="Connecte toi pour avoir accès aux favoris."
    />
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
      :name="this.authStatus ? 'Autres' : 'Chapitres'"
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
import Message from '../components/Message.vue'

export default {
  name: 'Home',
  components: {
    Slider,
    Message
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
  watch: {
    favorites : function(val) {

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
      },
      update: function(data) {
        data['favorites'].forEach(function(chapter) {
          if (typeof chapter.manga.team === 'string' || chapter.manga.team instanceof String)
            chapter.manga.team = chapter.manga.team.split(';');
          if (typeof chapter.url === 'string' || chapter.url instanceof String)
            chapter.url = chapter.url.split(';');
        });
        return data['favorites'];
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
      },
      update: function(data) {
        data['mangas'].forEach(function(manga) {
          if (typeof manga.team === 'string' || manga.team instanceof String)
            manga.team = manga.team.split(';');
          if (typeof manga.url === 'string' || manga.url instanceof String)
            manga.url = manga.url.split(';');
        });
        return data['mangas'];
      }
    },
    chapters: {
      query: gql`query chapters($mangaIds: [Int!]!, $searchText: String!) {
        chapters: allChapters(first: 50, mangaIds: $mangaIds, searchText: $searchText) {
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
          searchText: this.searchTextChapter
        };
      },
      update: function(data) {
        data['chapters'].forEach(function(chapter) {
          if (typeof chapter.manga.team === 'string' || chapter.manga.team instanceof String)
            chapter.manga.team = chapter.manga.team.split(';');
          if (typeof chapter.url === 'string' || chapter.url instanceof String)
            chapter.url = chapter.url.split(';');
        });
        return data['chapters'];
      }
    }
  }
}

</script>

<style>
</style>