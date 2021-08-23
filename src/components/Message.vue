<template>
    <div 
        class="bg-gray-800 border-blue-400 border-l-4 py-2 px-4"
    >
        <p class="text-white">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'MangaCard',
    props: [
        'message',
    ]
}

</script>

<style scoped>
</style>