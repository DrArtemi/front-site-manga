<template>
    <div class="w-screen flex-initial bg-gray-700">
        <div class="flex items-center justify-between h-16">
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <router-link to="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Mangas</router-link>
                    <!-- <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Mangas</a> -->
                    <router-link to="/settings" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Settings</router-link>
                    <!-- <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Préférences</a> -->
                    <a v-if="authStatus" href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{user.name}}</a>
                </div>
            </div>
            <div class="hidden md:block">
                <div class="mr-4 flex items-center md:ml-6">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a v-if="authStatus" href="#" class="text-blue-400 hover:underline px-3 py-2 text-sm font-medium" v-on:click="logOut">Logout</a>
                    <router-link v-else to="/login" class="text-blue-400 hover:underline px-3 py-2 text-sm font-medium">Login</router-link>
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
            console.log('Coucou toi');
            this.$store.dispatch('logOut');
        }
    },
    computed: {
        ...mapGetters(['authStatus', 'user'])
    }
}

</script>

<style scoped>
</style>