<template>
    <div>
        <div class="flex mb-4">
            <h2 class="text-2xl text-gray-50 font-medium">{{ name }}</h2>
            <Search
                class="w-32 md:w-40 xl:w-48 ml-auto self-end"
                @search="updateSearchText"
            />
        </div>
        <div class="relative group overflow-x-auto xl:overflow-hidden">
            <div
                v-if="rendered && hasElsBefore && sliderData.length > 0"
                class="hidden xl:flex absolute items-center top-0 left-0 w-8 h-full bg-black opacity-0 z-10 cursor-pointer group-hover:opacity-80 transition-all duration-300 ease-in-out"
                @click="page++"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="text-white block h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div
                v-if="rendered && hasElsAfter && sliderData.length > 0"
                class="hidden xl:flex absolute flex items-center top-0 right-0 w-8 h-full bg-black opacity-0 z-10 cursor-pointer group-hover:opacity-80 transition-all duration-300 ease-in-out"
                @click="page--"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="text-white block h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
            <ul
                v-if="sliderData.length > 0"
                class="flex flex-row relative transition-all duration-1000 ease-in-out"
                :style="{'transform': `translateX(${page}00%)`}"
            >
                <li
                    v-for="(data, idx) in sliderData"
                    :key="data.id"
                    :class="{ first: idx == 0, last: idx == sliderData.length - 1}"
                >
                    <ChapterCard
                        v-if="type == 'chapter'"
                        :chapter="data"
                    />
                    <MangaCard
                        v-if="type == 'manga'"
                        :manga="data"
                    />
                </li>
            </ul>
            <div v-if="sliderData.length == 0">
                <NoResult />
            </div>
        </div>
    </div>
</template>

<script>
import ChapterCard from './ChapterCard.vue'
import MangaCard from './MangaCard.vue'
import Search from './Search.vue'
import NoResult from './NoResult.vue'

export default {
    name: 'Slider',
    components: {
        ChapterCard,
        MangaCard,
        Search,
        NoResult
    },
    props: [
        'name',
        'sliderData',
        'type'
    ],
    data() {
        return {
            rendered: false,
            page: 0,
            hasElsBefore: false,
            hasElsAfter: false
        }
    },
    watch: {
        sliderData: function(newVal, oldVal) {
            this.$nextTick(function() {
                this.checkSlider();
            });
        },
        page: function() { setTimeout(() => this.checkSlider(), 1000); }
    },
    methods: {
        checkSlider: function() {
            let lastEl = this.$el.getElementsByClassName('last')[0];
            let firstEl = this.$el.getElementsByClassName('first')[0];
            if (lastEl !== undefined)
                this.hasElsAfter = !this.isScrolledIntoView(lastEl);
            if (firstEl !== undefined)
                this.hasElsBefore = !this.isScrolledIntoView(firstEl);
        },
        isScrolledIntoView: function(el) {
            let rect = el.getBoundingClientRect();
            let elemLeft = rect.left;
            let elemRight = rect.right;
            return (elemLeft >= 0) && (elemRight <= window.innerWidth);
        },
        updateSearchText: function(searchText) {
            this.$emit('search', searchText);
        }
    },
    mounted: function() {
        this.rendered = true
    }
}

/* 
<template>
    <div class="mt-12 ml-6 mr-4 overflow-hidden">
        <div class="flex mb-6">
            <h2 class="text-2xl text-gray-50 font-medium">{{ name }}</h2>
            <Search
                class="w-48 ml-auto self-end"
                @search="updateSearchText"
            />
        </div>
        <div class="relative group">
            <div
                v-if="rendered && hasElsBefore && sliderData.length > 0"
                class="absolute flex items-center top-0 left-0 w-8 h-full bg-black opacity-0 z-10 cursor-pointer group-hover:opacity-80 transition-all duration-300 ease-in-out"
                @click="page++"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="text-white block h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div
                v-if="rendered && hasElsAfter && sliderData.length > 0"
                class="absolute flex items-center top-0 right-0 w-8 h-full bg-black opacity-0 z-10 cursor-pointer group-hover:opacity-80 transition-all duration-300 ease-in-out"
                @click="page--"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="text-white block h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
            <ul
                v-if="sliderData.length > 0"
                class="flex flex-row relative transition-all duration-1000 ease-in-out"
                :style="{'transform': `translateX(${page}00%)`}"
            >
                <li
                    v-for="(data, idx) in sliderData"
                    :key="data.id"
                    :class="{ first: idx == 0, last: idx == sliderData.length - 1}"
                >
                    <ChapterCard
                        v-if="type == 'chapter'"
                        :chapter="data"
                    />
                    <MangaCard
                        v-if="type == 'manga'"
                        :manga="data"
                    />
                </li>
            </ul>
            <div v-if="sliderData.length == 0">
                <NoResult />
            </div>
        </div>
    </div>
</template>
*/

</script>

<style scoped>
</style>