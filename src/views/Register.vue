<template>
    <div class="auth">
        <div class="mt-10 mb-5 sm:mt-5 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-80">
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-white">Inscription</h3>
                        <p class="mt-1 text-sm text-white">
                            Créé un compte pour pouvoir suivre des mangas et avoir accès à une liste de tes favoris.<br>
                            L'adresse email est uniquement utilisée pour la connexion.
                        </p>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form action="POST" @submit.prevent="registerUser">
                        <div class="shadow sm:rounded-md overflow-hidden">
                            <div class="px-4 py-5 bg-gray-700 sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="pseudo" class="block text-sm font-medium text-gray-200">Identifiant</label>
                                        <input 
                                            type="text"
                                            name="pseudo"
                                            placeholder="TomAto"
                                            v-model="authDetails.pseudo"
                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            :class="{ 'border-red-500': pseudoFailure !== '' }"
                                        />
                                        <p
                                            v-if="pseudoFailure !== ''"
                                            class="text-red-500 m-0"
                                        >
                                            {{ pseudoFailure }}
                                        </p>
                                    </div>
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="email" class="block text-sm font-medium text-gray-200">Adresse email</label>
                                        <input 
                                            type="email"
                                            name="email" 
                                            placeholder="exemple@email.com"
                                            v-model="authDetails.email"
                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            :class="{ 'border-red-500': emailFailure !== '' }"
                                        />
                                        <p
                                            v-if="emailFailure !== ''"
                                            class="text-red-500 m-0"
                                        >
                                            {{ emailFailure }}
                                        </p>
                                    </div>
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="password" class="block text-sm font-medium text-gray-200">Mot de passe</label>
                                        <input 
                                            type="password"
                                            name="password"
                                            placeholder="mot de passe"
                                            v-model="authDetails.password"
                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            :class="{ 'border-red-500': passwordFailure !== '' }"
                                        />
                                        <p
                                            v-if="passwordFailure !== ''"
                                            class="text-red-500 m-0"
                                        >
                                            {{ passwordFailure }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-800 sm:px-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-3">
                                        <router-link to="/login" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200">
                                            Connexion
                                        </router-link>
                                    </div>
                                    <div class="col-span-3 text-right">
                                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Inscription
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
    name: 'Register',
    data () {
        return {
            authDetails: {
                pseudo: '',
                email: '',
                password: ''
            },
            pseudoFailure: '',
            emailFailure: '',
            passwordFailure: '',
        }
    },
    methods: {
        ...mapActions(['register']),

        registerUser: function () {
            var self = this;
            this.pseudoFailure = '';
            this.emailFailure = '';
            this.passwordFailure = '';
            this.register(this.authDetails).then(function(res) {
                if (res.status === 'success')
                    self.$router.push('/');
                else {
                    let failRes = res.message.split(':');
                    if (failRes.length == 2) {
                        if (failRes[0] === 'pseudo')
                            self.pseudoFailure = failRes[1];
                        else if (failRes[0] === 'mail')
                            self.emailFailure = failRes[1];
                        else if (failRes[0] === 'password')
                            self.passwordFailure = failRes[1];
                    }
                }
            });
        }
    }
}
</script>

<style>
</style>