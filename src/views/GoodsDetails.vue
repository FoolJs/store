<template>
    <div id="goods-details">
        <div class="goods-details-top">
            <div class="goods-details-top-packing">
                <p class="name">{{ name }}</p>
                <p class="goods-details-top-right">
                    <span>概述</span>
                    <span>参数</span>
                    <span>评价</span>
                </p>
            </div>
        </div>
        <goods-details-main :details="details"></goods-details-main>
    </div>
</template>

<script>
import GoodsDetailsMain from '../components/goodsDetails/GoodsDetailsMain.vue';
import { getGoodsDetails } from '../server/commodity.js';

export default {
    components: { GoodsDetailsMain },
    name: 'GoodsDetails',
    props: {
        name: {
            type: String
        }
    },
    data () {
        return {
            details: null
        }
    },
    mounted () {
        getGoodsDetails({Name: this.name})
        .then( res => {
            this.details = res.data.details;
        })
        .catch(err => {
            console.log(err);
        })
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

#goods-details {

    .goods-details-top {
        border-top: 1px solid rgb(224, 221, 221);
        box-shadow: 0 5px 5px rgb(0 0 0 / 7%);
        margin-bottom: 30px;

        .goods-details-top-packing {
            display: flex;
            justify-content: space-between;

            width: var(--main-width);
            margin: 0 auto;
            padding: 18px 0;

            > .name {
                font-size: 18px;
                font-weight: 400;
                color: #424242;
            }

            > .goods-details-top-right {
                > span {
                    margin-left: 1em;
                    color: #616161;
                }
            }
        }
    }
}

</style>