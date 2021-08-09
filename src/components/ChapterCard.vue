<template>
    <a 
        :href="chapter.url" target="_blank"
        class="flex w-48 h-56 mr-2 bg-cover bg-center align-text-bottom rounded cursor-pointer"
        :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(/manga_covers/' + chapter.manga.cover_path + ')'}"
    >
        <div class="self-end ml-2 mb-1">
            <h3 class="text-base font-bold leading-4 text-white">{{ chapter.manga.title }}</h3>
            <span class="text-sm text-white">Ch. {{ chapter.number }}</span>
        </div>
    </a>
</template>

<script>

export default {
    name: 'ChapterCard',
    props: [
        'chapter',
    ],
}

</script>

<style scoped>
</style>