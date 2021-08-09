<template>
    <div class="relative">
        <input
            class="w-full min-w-full p-0 focus:ring-0 border-0 rounded-none bg-transparent text-white border-b-2 border-solid border-gray-700 focus:border-gray-700"
            type="text"
            v-model="searchText"
            v-on:input="updateSearchText"
            placeholder="Recherche..."
        />
        <span class="input-highlight absolute select-none border-t-2 border-white border-solid max-w-full h-0 left-0 bottom-0 text-transparent overflow-hidden">
            {{ searchText.replace(/ /g, "\u00a0") }}
        </span>
    </div>
</template>

<script>

export default {
    name: 'Search',
    props: [],
    data() {
        return {
            searchText: ''
        }
    },
    methods: {
        updateSearchText: function(input) {
            this.$emit('search', this.searchText.toLowerCase());
        }
    }
}

</script>

<style scoped>

input:focus + .input-highlight {
    border-color: rgba(252, 211, 77, 1);;
}

</style>