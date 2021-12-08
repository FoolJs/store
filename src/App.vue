<template>
    <div id="app">
        <nav-list />
        <login />
        <second-nav-list />
        <main>
            <keep-alive :include="['Home']">
                <router-view />
            </keep-alive>
        </main>
        <nav-bottom />
    </div>
</template>

<script>
import NavList from "@/components/NavList/NavList.vue";
import SecondNavList from "@/components/SecondNav/SecondNavList.vue";
import NavBottom from "@/components/NavBottom/NavBottom.vue";
import Login from "@/views/Login.vue";

export default {
    name: "App",
    components: {
        NavList,
        SecondNavList,
        NavBottom,
        Login,
    },
    mounted () {
        
    },
    computed: {

    }
};
</script>

<style lang="scss">
:root {
    --main-width: 80vw;
}


body {
    overflow:-Scroll;
    overflow-x:hidden;
}

#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 100vh;
    font: sans-serif;

    main {
        flex: 1;
        width: 100%;
    }
}
</style>
