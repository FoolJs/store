<template>
    <div id="login" v-if="isShow" @click.self="closePage">
        <login-main></login-main>
    </div>
</template>

<script>
import LoginMain from '../components/Login/LoginMain.vue'

export default {
    name: 'Login',
    components: { LoginMain },
    computed: {
        isShow () {
            return this.$store.state.login.isShow;
        }
    },
    methods: {
        closePage () {
            this.$store.commit('closeShow');
        }
    }
}
</script>

<style lang="scss" scoped>

#login {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    width: 100vw;
    min-height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.329);

    z-index: 10;
}


</style>
