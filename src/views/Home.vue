<template>
  <div class="flex-auto">
    <Message
      class="mt-2 mb-4 md:mt-8 ml-2 lg:ml-4 mr-2 lg:mr-4"
      message="Si tu veux indexer une nouvelle team contacte moi sur twitter."
      color="border-yellow-400"
    />
    <Message
      v-if="!authStatus"
      class="mt-2 mb-4 md:mt-4 ml-2 lg:ml-4 mr-2 lg:mr-4"
      message="Connecte toi pour avoir accès aux favoris."
      color="border-blue-400"
    />
    <Settings
      class="mt-2 md:mt-8 ml-2 lg:ml-4"
      :teams="teams"
      @langages="updateSelectedLangages"
      @teams="updateSelectedTeams"
    />
    <Slider
      v-if="authStatus && favorites"
      class="mt-2 mb-4 md:mt-4 ml-2 lg:ml-4 mr-2 lg:mr-4"
      name="Favoris"
      :sliderData="favorites"
      type="chapter"
      @search="updateSearchTextFavorite"
    />
    <Slider
      class="mb-4 md:mt-4 ml-2 lg:ml-4 mr-2 lg:mr-4"
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
import Settings from '../components/Settings.vue'

export default {
  name: 'Home',
  components: {
    Slider,
    Message,
    Settings
  },
  data() {
    return {
      mangas: '',
      chapters: '',
      searchTextChapter: '',
      searchTextManga: '',
      searchTextFavorite: '',
      selectedLangages: [],
      selectedTeams: []
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
    },
    updateSelectedLangages: function(langages) {
      this.selectedLangages = langages;
    },
    updateSelectedTeams: function(teams) {
      this.selectedTeams = teams;
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
    teams: {
      query: gql`query teams($selectedLangages: [String]) {
        teams: allTeams(langage: $selectedLangages) {
          id
          name
          langage
          url
        }
      }`,
      variables() {
        return {
          selectedLangages: this.selectedLangages,
        };
      },
    },
    favorites: {
      query: gql`query favorites($mangaIds: [Int!]!, $searchText: String!, $selectedLangages: [String], $selectedTeams: [String]) {
        favorites: userChapters(first: 50, mangaIds: $mangaIds, searchText: $searchText, langage: $selectedLangages, team: $selectedTeams) {
          id
          title
          number
          url
          date
          manga {
            id
            title
            cover_path
          }
          teams {
            id
            name
            langage
            url
          }
        }
      }`,
      variables() {
        return {
          mangaIds: this.mangaIds,
          searchText: this.searchTextFavorite,
          selectedLangages: this.selectedLangages,
          selectedTeams: this.selectedTeams
        };
      },
      update: function(data) {
        data['favorites'].forEach(function(chapter) {
          if (typeof chapter.url === 'string' || chapter.url instanceof String)
            chapter.url = chapter.url.split(';');
        });
        return data['favorites'];
      }
    },
    mangas: {
      query: gql`query mangas($searchText: String!, $selectedLangages: [String], $selectedTeams: [String]) {
        mangas: allMangas(first: 50, searchText: $searchText, langage: $selectedLangages, team: $selectedTeams) {
          id
          title
          url
          cover_path
          teams {
            id
            name
            langage
            url
          }
        }
      }`,
      variables() {
        return {
          searchText: this.searchTextManga,
          selectedLangages: this.selectedLangages,
          selectedTeams: this.selectedTeams
        };
      },
      update: function(data) {
        data['mangas'].forEach(function(manga) {
          if (typeof manga.url === 'string' || manga.url instanceof String)
            manga.url = manga.url.split(';');
        });
        return data['mangas'];
      }
    },
    chapters: {
      query: gql`query chapters($mangaIds: [Int!]!, $searchText: String!, $selectedLangages: [String], $selectedTeams: [String]) {
        chapters: allChapters(first: 50, mangaIds: $mangaIds, searchText: $searchText, langage: $selectedLangages, team: $selectedTeams) {
          id
          title
          number
          url
          date
          manga {
            id
            title
            cover_path
          }
          teams {
            id
            name
            langage
            url
          }
        }
      }`,
      variables() {
        return {
          mangaIds: this.mangaIds,
          searchText: this.searchTextChapter,
          selectedLangages: this.selectedLangages,
          selectedTeams: this.selectedTeams
        };
      },
      update: function(data) {
        data['chapters'].forEach(function(chapter) {
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