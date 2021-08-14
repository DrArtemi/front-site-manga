<template>
    <div class="auth">
        <div class="mt-10 mb-5 sm:mt-5 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-80">
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-white">Connexion</h3>
                        <p class="mt-1 text-sm text-white">
                            Connecte toi pour pouvoir suivre des mangas et avoir accès à une liste de tes favoris.
                        </p>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form action="POST" @submit.prevent="loginUser">
                        <div class="shadow sm:rounded-md overflow-hidden">
                            <div class="px-4 py-5 bg-gray-700 sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="email" class="block text-sm font-medium text-gray-200">Adresse email</label>
                                        <input type="email" name="email"  placeholder="exemple@email.com" v-model="authDetails.email" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                    </div>
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="password" class="block text-sm font-medium text-gray-200">Mot de passe</label>
                                        <input type="password" name="password" placeholder="mot de passe" v-model="authDetails.password" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-800 sm:px-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-3">
                                        <router-link to="/register" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200">
                                            Inscription
                                        </router-link>
                                    </div>
                                    <div class="col-span-3 text-right">
                                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Connexion
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data () {
        return {
            authDetails: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(['login']),

        loginUser: function () {
            this.login(this.authDetails).then(() => this.$router.push('/'))
        }
    }
}
</script>

<style scoped>

</style>