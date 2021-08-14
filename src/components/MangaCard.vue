<template>
    <a 
        :href="manga.url" target="_blank"
        class="flex flex-col w-32 md:w-40 xl:w-48 h-40 md:h-48 xl:h-56 mr-2 bg-cover bg-center align-text-bottom rounded cursor-pointer"
        :style="[manga.cover_path ?
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(/manga_covers/' + manga.cover_path + ')' } :
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), rgba(31, 41, 55, 1)' }
                ]"
    >
        <div class="flex ml-2 mt-auto">
            <h3 class="text-base font-bold text-white mb-1 self-end">{{ manga.title }}</h3>
            <LikeButton
                v-if="authStatus"
                class="ml-auto self-end"
                likeType="manga"
                :likeId="index"
                :mangaId="manga.id"
            />
        </div>
    </a>
</template>

<script>
import { mapGetters } from 'vuex'
import LikeButton from '../components/LikeButton.vue'

export default {
    name: 'MangaCard',
    components: {
        LikeButton,
    },
    props: [
        'manga',
        'index'
    ],
    computed: {
        ...mapGetters(['authStatus']),
    }
}

</script>

<style scoped>
</style>