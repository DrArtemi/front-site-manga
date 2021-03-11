<template>
    <div class="settings">
        <h3> These are your details... </h3>
        <p> Pseudo: {{ user.pseudo }}</p>
        <p> Email: {{ user.email }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Settings',
    components: {
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>

<style>
</style>