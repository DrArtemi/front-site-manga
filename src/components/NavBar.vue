<template>
    <div class="w-screen flex-initial bg-gradient-to-b from-black">
        <div class="flex items-center justify-between h-24">
            <div>
                <div class="ml-4 lg:ml-8 flex items-baseline space-x-4">
                    <router-link to="/" class="text-white px-3 py-2 rounded-md text-sm font-medium self-center">
                        <img class="h-12 w-12" src="/piou_knife.png" alt="piou piou gang" />
                    </router-link>
                    <!-- <router-link to="/settings" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Settings</router-link> -->
                    <!-- <a v-if="authStatus" href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{user.name}}</a> -->
                </div>
            </div>
            <div>
                <div class="mr-6 flex items-center md:ml-6">
                    <a class="self-center" href="https://twitter.com/fuckjapscan" target="_blank">
                        <svg class="fill-current text-blue-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
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