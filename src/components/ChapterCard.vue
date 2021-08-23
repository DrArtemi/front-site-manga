<template>
    <div 
        class="chapter-card flex flex-col w-32 md:w-40 xl:w-48 h-40 md:h-48 xl:h-56 mr-2 bg-cover bg-center align-text-bottom rounded cursor-pointer"
        :style="[chapter.manga.cover_path ?
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(/manga_covers/' + chapter.manga.cover_path + ')' } :
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), rgba(31, 41, 55, 1)' }
                ]"
    >
        <div
            v-if="chapter.manga.team.length > 1"
            class="flex flex-col flex-1 hover:bg-black hover:bg-opacity-40 max-h-full"
        >
            <div
                v-if="(new Date - new Date(chapter.date)) < DAY"
                class="self-end bg-red-600 py-1 px-2 font-bold text-white text-xs rounded-tr rounded-bl"
            >
                Aujourd'hui
            </div>
            <div class="team-links hidden flex-col flex-1 items-center overflow-auto py-1">
                <a
                    v-for="(team, idx) in chapter.manga.team"
                    :key="team"
                    :href="chapter.url[idx]" target="_blank"
                    class="text-white bg-black hover:bg-opacity-100 bg-opacity-90 w-4/5 mb-1 p-2 rounded text-center text-sm"
                    :class="{ 'mt-auto': idx == 0, 'mb-auto': idx == chapter.manga.team.length - 1}"
                >
                    {{ team }}
                </a>
            </div>
            <div class="flex ml-2 mt-auto">
                <div class="mb-1 self-end">
                    <h3 class="text-sm xl:text-base font-bold leading-4 text-white">{{ chapter.manga.title }}</h3>
                    <span class="text-xs xl:text-sm text-white">Ch. {{ chapter.number }}</span>
                </div>
                <LikeButton
                    v-if="authStatus"
                    class="ml-auto self-end"
                    likeType="chapter"
                    :likeId="index"
                    :mangaId="chapter.manga.id"
                />
            </div>
        </div>
        <a v-else
            :href="chapter.url[0]" target="_blank"
            class="flex flex-col flex-1"
        >
            <div
                v-if="(new Date - new Date(chapter.date)) < DAY"
                class="self-end bg-red-600 py-1 px-2 font-bold text-white text-xs rounded-tr rounded-bl"
            >
                Aujourd'hui
            </div>
            <div class="flex ml-2 mt-auto">
                <div class="mb-1 self-end">
                    <h3 class="text-sm xl:text-base font-bold leading-4 text-white">{{ chapter.manga.title }}</h3>
                    <span class="text-xs xl:text-sm text-white">Ch. {{ chapter.number }}</span>
                </div>
                <LikeButton
                    v-if="authStatus"
                    class="ml-auto self-end"
                    likeType="chapter"
                    :likeId="index"
                    :mangaId="chapter.manga.id"
                />
            </div>
        </a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LikeButton from '../components/LikeButton.vue'

export default {
    name: 'ChapterCard',
    components: {
        LikeButton,
    },
    props: [
        'chapter',
        'index'
    ],
    data() {
        return {
            DAY: 86400000
        }
    },
    computed: {
        ...mapGetters(['authStatus']),
    }
}

</script>

<style scoped>

.chapter-card:hover .team-links,
.chapter-card:focus .team-links {
    display: flex;
}

</style>