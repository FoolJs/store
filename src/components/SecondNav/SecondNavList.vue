<template>
    <div class="second-nav-list">
        <div class="second-nav-list-left">
            <img 
                :src="logoSrc" alt="logo" 
                @click="goHome"
            />
        </div>
        <secound-nav-right :navList="navList"></secound-nav-right>
    </div>
</template>

<script>
import SecoundNavRight from './SecondNavRight.vue';

export default {
    name: 'SecondNavList',
    components: {
        SecoundNavRight
    },
    data () {
        return {
            logoSrc: require( '../../assets/logo.png' ),
            navList: [
                {id: 0, path: '/goods/phone', name: '手机'},
                {id: 1, path: '/goods/appliances', name: '家电'},
                {id: 2, path: '/goods/wear', name: '智能穿戴'},
                {id: 5, path: '/goods/travel', name: '出行搭配'},
                {id: 6, path: '/goods/daily', name: '日用百货'},
                {id: 7, path: '/service', name: '服务'},
                {id: 8, path: '/community', name: '社区'},
            ]
        }
    },
    methods: {
        goHome () {
            this.$router.push({path: '/'}).catch(err => err)
        }
    }
}
</script>

<style lang="scss" scoped>

.second-nav-list {
    display: flex;
    align-items: center;

    width: var(--main-width);
    margin-top: 1em;
    margin-bottom: 2em;

    .second-nav-list-left {
        flex: 2;
        font-size: 0;

        > img {
            width: 56px;
            height: 56px;
            cursor: pointer;
        }
    }
}

</style>