<template>
    <div 
        class="manga-card flex flex-col w-32 md:w-40 xl:w-48 h-40 md:h-48 xl:h-56 mr-2 bg-cover bg-center align-text-bottom rounded cursor-pointer"
        :style="[manga.cover_path ?
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(/manga_covers/' + manga.cover_path + ')' } :
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), rgba(31, 41, 55, 1)' }
                ]"
    >
        <div
            v-if="manga.url.length > 1"
            class="flex flex-col flex-1 hover:bg-black hover:bg-opacity-40"
            :class="{ 'bg-black': this.teamsClicked, 'bg-opacity-40': this.teamsClicked }"
            v-on:click="toggleTeams"
        >
            <div 
                class="team-links flex-col flex-1 items-center overflow-auto py-1"
                :class="{ 'flex': this.teamsClicked, 'hidden': !this.teamsClicked }"
            >
                <a
                    v-for="(url, idx) in manga.url"
                    :key="getTeamFromUrl(manga.teams, url)"
                    :href="url" target="_blank"
                    class="text-white bg-black hover:bg-opacity-100 bg-opacity-90 w-4/5 mb-1 p-2 rounded text-center text-sm"
                    :class="{ 'mt-auto': idx == 0, 'mb-auto': idx == manga.url.length - 1}"
                >
                    <flag
                        :iso="getLangFromUrl(manga.teams, url)"
                        class="rounded-full mr-1"
                    />
                    {{ getTeamFromUrl(manga.teams, url) }}
                </a>
            </div>
            <div class="flex ml-2 mt-auto">
                <h3 class="text-sm xl:text-base font-bold text-white mb-1 self-end">{{ manga.title }}</h3>
                <LikeButton
                    v-if="authStatus"
                    class="ml-auto self-end"
                    likeType="manga"
                    :likeId="index"
                    :mangaId="manga.id"
                />
            </div>
        </div>
        <a v-else
            :href="manga.url[0]" target="_blank"
            class="flex flex-1 flex-col"
        >
            <flag
                :iso="getLangFromUrl(manga.teams, manga.url[0])"
                class="rounded-full self-start m-1"
            />
            <div class="flex ml-2 mt-auto">
                <h3 class="text-sm xl:text-base font-bold text-white mb-1 self-end">{{ manga.title }}</h3>
                <LikeButton
                    v-if="authStatus"
                    class="ml-auto self-end"
                    likeType="manga"
                    :likeId="index"
                    :mangaId="manga.id"
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
    name: 'MangaCard',
    components: {
        LikeButton,
    },
    props: [
        'manga',
        'index'
    ],
    data() {
        return {
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

.manga-card:hover .team-links {
    display: flex;
}

</style>