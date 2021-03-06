<template>
    <div 
        class="chapter-card flex flex-col w-32 md:w-40 xl:w-48 h-40 md:h-48 xl:h-56 mr-2 bg-cover bg-center align-text-bottom rounded cursor-pointer"
        :style="[chapter.manga.cover_path ?
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(/manga_covers/' + chapter.manga.cover_path + ')' } :
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), rgba(31, 41, 55, 1)' }
                ]"
    >
        <div
            v-if="chapter.url.length > 1"
            class="flex flex-col flex-1 hover:bg-black hover:bg-opacity-40 max-h-full"
            :class="{ 'bg-black': this.teamsClicked, 'bg-opacity-40': this.teamsClicked }"
            v-on:click="toggleTeams"
        >
            <div
                v-if="(new Date - new Date(chapter.date)) < DAY"
                class="self-end bg-red-600 py-1 px-2 font-bold text-white text-xs rounded-tr rounded-bl"
            >
                Aujourd'hui
            </div>
            <div
                class="team-links flex-col flex-1 items-center overflow-auto py-1"
                :class="{ 'flex': this.teamsClicked, 'hidden': !this.teamsClicked }"
            >
                <a
                    v-for="(url, idx) in chapter.url"
                    :key="getTeamFromUrl(chapter.teams, url)"
                    :href="url" target="_blank"
                    class="text-white bg-black hover:bg-opacity-100 bg-opacity-90 w-4/5 mb-1 p-1 md:p-2 rounded text-center text-sm"
                    :class="{ 'mt-auto': idx == 0, 'mb-auto': idx == chapter.url.length - 1}"
                >
                    <flag
                        :iso="getLangFromUrl(chapter.teams, url)"
                        class="rounded-full mr-1"
                    />
                    {{ getTeamFromUrl(chapter.teams, url) }}
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
            <div class="flex flex-row justify-between">
                <flag
                    :iso="getLangFromUrl(chapter.teams, chapter.url[0])"
                    class="rounded-full self-start m-1"
                />
                <div
                    v-if="(new Date - new Date(chapter.date)) < DAY"
                    class="self-end bg-red-600 py-1 px-2 font-bold text-white text-xs rounded-tr rounded-bl"
                >
                    Aujourd'hui
                </div>
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
import { parseDomain, fromUrl } from 'parse-domain';
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
            DAY: 86400000,
            teamsClicked: false
        }
    },
    computed: {
        ...mapGetters(['authStatus']),
    },
    methods: {
        toggleTeams: function() {
            this.teamsClicked = !this.teamsClicked;
        },
        getTeamFromUrl: function(teams, url) {
            let idx = teams.findIndex(function(team) {
                let domain = parseDomain(fromUrl(team.url));
                let cleaned_domain = domain.domain + '.' + domain.topLevelDomains.join('.');
                return url.includes(cleaned_domain);
            });
            if (idx === -1)
                return parseDomain(fromUrl(url)).domain;
            return teams[idx].name;
        },
        getLangFromUrl: function(teams, url) {
            let idx = teams.findIndex(function(team) {
                let domain = parseDomain(fromUrl(team.url));
                let cleaned_domain = domain.domain + '.' + domain.topLevelDomains.join('.');
                return url.includes(cleaned_domain);
            });
            if (idx === -1)
                return '';
            return teams[idx].langage;
        }
    }
}

</script>

<style scoped>

.chapter-card:hover .team-links {
    display: flex;
}

</style>