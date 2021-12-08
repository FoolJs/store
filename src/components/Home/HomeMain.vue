<template>
    <div class="home-main">
        <div class="advert">
            <img :src="src" />
        </div>
        <type-main></type-main>
    </div>
</template>


<script>
import { getAdvert } from '../../server/advert.js';
import TypeMain from './TypeMain.vue';

export default {
    name: 'HomeMain',
    components: {
        TypeMain
    },
    data () {
        return {
            src: ''
        }
    },
    mounted () {
        getAdvert()
        .then( res => {
            this.src = res.data.data.src;
        })
        .catch(err => console.log(err));
    }
}
</script>

<style lang="scss" scoped>

.home-main {
    width: 100%;
    background: #f5f5f5;
    padding: 30px 0 10px 0;

    .advert {
        width: var(--main-width);
        margin: 0 auto;
        cursor: pointer;

        > img {
            max-width: 100%;
        }
    }
}

</style>
