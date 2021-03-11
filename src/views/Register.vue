<template>
    <div class="auth">
        <h3>Sign Up</h3>
        <form action="POST" @submit.prevent="registerUser">
            <label for="name">Pseudo</label>
            <input type="text" name="pseudo"  placeholder="Patrick" v-model="authDetails.name" />
            <label for="email">Email Address</label>
            <input type="email" name="email"  placeholder="yourdopeemail@something.com" v-model="authDetails.email" />
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="password" v-model="authDetails.password" />
            <button class="auth-submit">submit</button>
            <p class="auth-text"> Already have an account? <router-link to="/login"> Login </router-link> </p>
        </form>
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