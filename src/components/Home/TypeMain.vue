<template>
    <div class="type-main">
        <goods-recommend
            v-for="item of list"
            :key="item._id"
            :goodsContent="item"
        ></goods-recommend>
    </div>
</template>

<script>
import GoodsRecommend from './GoodsRecommend.vue';
import { getRecommendGoods } from '../../server/recommendGoods.js';

export default {
    components: { GoodsRecommend },
    name: 'TypeMain',
    data () {
        return {
            list: []
        }
    },
    mounted () {
        getRecommendGoods({})
        .then( res => {
            this.list = res.data.list;
        })
        .catch( err => console.log(err));
    }
}
</script>

<style lang="scss" scoped>

.type-main {
    width: var(--main-width);
    margin: 0 auto;
    margin-top: 2em;
}


</style>