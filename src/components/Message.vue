<template>
    <div 
        class="bg-gray-800 border-l-4 py-2 px-4"
        :class="color"
    >
        <p class="text-white">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'MangaCard',
    props: [
        'message',
        'color'
    ]
}

</script>

<style scoped>
</style>