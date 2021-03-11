<template>
    <div class="auth">
        <div class="mt-10 sm:mt-5 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-80">
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">Register</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            Create an account to save your preferences.<br>
                            Email address will only be used to retrieve your account.
                        </p>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form action="POST" @submit.prevent="registerUser">
                        <div class="shadow sm:rounded-md overflow-hidden">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="pseudo" class="block text-sm font-medium text-gray-700">Pseudo</label>
                                        <input type="text" name="pseudo"  placeholder="Patrick" v-model="authDetails.pseudo" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                    </div>
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input type="email" name="email"  placeholder="yourdopeemail@something.com" v-model="authDetails.email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                    </div>
                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                        <input type="password" name="password" placeholder="password" v-model="authDetails.password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 sm:px-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-3">
                                        <router-link to="/login" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200">
                                            Sign In
                                        </router-link>
                                    </div>
                                    <div class="col-span-3 text-right">
                                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Register
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
            }
        }
    },
    methods: {
        ...mapActions(['register']),

        registerUser: function () {
            this.register(this.authDetails).then(() => this.$router.push('/'));
        }
    }
}
</script>

<style>
</style>