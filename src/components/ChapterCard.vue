<template>
    <div 
        class="flex bg-blue-500 w-48 h-36 mr-1 bg-cover bg-center align-text-bottom rounded"
        v-bind:style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(/manga_covers/' + chapter.manga.cover_path + ')'}"
    >
        <div class="self-end ml-2 mb-1">
            <h3 class="text-base font-bold leading-4 text-white">{{ chapter.manga.title }}</h3>
            <span class="text-sm text-white">Ch. {{ chapter.number }}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Slider',
    props: [
        'chapter',
    ],
}

</script>

<style scoped>
</style>