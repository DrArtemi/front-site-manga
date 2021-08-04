<template>
    <div class="mt-12 ml-6">
        <h2 class="text-2xl text-gray-50 mb-4 font-medium">{{ name }}</h2>
        <ul class="flex flex-row">
            <li v-for="chapter of chapters" :key="chapter.id">
                <ChapterCard v-bind:chapter="chapter"/>
            </li>
        </ul>
    </div>
</template>

<script>
import ChapterCard from './ChapterCard.vue'

export default {
    name: 'Slider',
    components: {
        ChapterCard,
    },
    props: [
        'name',
        'chapters',
        'type'
    ],
}

</script>

<style scoped>
</style>