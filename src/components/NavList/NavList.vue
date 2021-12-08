<template>
    <nav class="nav-list">
        <div class="nav-list-main">
            <nav-list-item-left :navListLeft="navListLeft"></nav-list-item-left>
            <nav-list-item-right></nav-list-item-right>
        </div>
    </nav>
</template>

<script>
import NavListItemLeft from './NavListItemLeft.vue';
import NavListItemRight from './NavListItemRight.vue';

export default {
    name: 'NavList',
    components: {
        NavListItemLeft,
        NavListItemRight
    },
    data () {
        return {
            navListLeft: [
                {id: 0, name: '小米商城', path: '/'},
                {id: 1, name: 'MIUI', path: '/'},
                {id: 2, name: 'loT', path: '/'},
                {id: 3, name: '云服务', path: '/'},
                {id: 4, name: '天星数科', path: '/'},
                {id: 5, name: '有品', path: '/'},
                {id: 6, name: '小爱开放平台', path: '/'},
                {id: 7, name: '企业团购', path: '/'},
                {id: 8, name: '资质证照', path: '/'},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

.nav-list {
    width: 100%;
    background: #333;

    .nav-list-main {
        display: flex;

        width: var(--main-width);
        margin: 0 auto;

        color: #b0b0b0;
        font-size: .7em;
    }
}
</style>
