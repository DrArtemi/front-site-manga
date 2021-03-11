<template>
    <div class="w-screen bg-gray-700">
        <div class="flex items-center justify-between h-16">
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Mangas</a>
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Préférences</a>
                    <a v-if="authStatus" href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{user.name}}</a>
                </div>
            </div>
            <div class="hidden md:block">
                <div class="mr-4 flex items-center md:ml-6">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a href="#" class="text-blue-400 hover:underline px-3 py-2 text-sm font-medium">Connexion</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'NavBar',
    methods: {
        logOut: function () {
            this.$store.dispatch('logOut')
        }
    },
    computed: {
        ...mapGetters(['authStatus', 'user'])
    }
}

</script>

<style scoped>
</style>