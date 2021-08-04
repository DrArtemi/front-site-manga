<template>
  <div class="flex-auto bg-gray-800">
    <!-- Si on est connecté slider mes chapitres -->
    <!-- Slider derniers chapitres -->
    <!-- Slider mangas -->
    <Slider name="Nouveaux chapitres" v-bind:chapters="chapters" type="chapter"/>
    <!-- <ul>
      <li v-for="manga of mangas" :key="manga.id">
        <p>{{ manga.title }}</p>
        <img v-bind:src="'/manga_covers/' + manga.cover_path">
      </li>
    </ul> -->
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
      static_url: process.env.VUE_APP_MANGA_IMAGE_PATH
    }
  },
  apollo: {
    mangas: gql`query {
      mangas: allMangas {
        id
        title
        team
        cover_path
      }
    }`,
    chapters: gql`query {
      chapters: allChapters(first: 50) {
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
  }
}

</script>

<style>
</style>