<template>
  <div class="flex-auto">
    <!-- Si on est connecté slider mes chapitres -->
    <Slider
      name="Derniers chapitres"
      :sliderData="chapters"
      type="chapter"
    />
    <Slider
      name="Mangas"
      :sliderData="mangas"
      type="manga"
    />
    <Slider
      name="Mangas"
      :sliderData="mangas"
      type="manga"
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