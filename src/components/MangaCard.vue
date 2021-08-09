<template>
    <a 
        :href="'#'"
        class="flex w-48 h-56 mr-2 bg-cover bg-center align-text-bottom rounded cursor-pointer"
        :style="[manga.cover_path ?
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(/manga_covers/' + manga.cover_path + ')' } :
                { backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), rgba(31, 41, 55, 1)' }
                ]"
    >
        <div class="self-end ml-2 mb-1">
            <h3 class="text-base font-bold text-white">{{ manga.title }}</h3>
        </div>
    </a>
</template>

<script>

export default {
    name: 'MangaCard',
    props: [
        'manga',
    ],
}

</script>

<style scoped>
</style>