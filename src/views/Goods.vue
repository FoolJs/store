<template>
    <div id="goods">

        <div class="top">
            <p>
            <span>
                分类 
            </span>
            > 
            <span>
                {{ pageTitle }}
            </span>
            </p>
        </div>


        <div class="goods-main">

            <div class="packing">
            
            <goods-card
                v-for="(item, index) of commodity"
                :key="index"
                :card="item"
            ></goods-card>

            </div>

        </div>


    </div>
</template>

<script>
import GoodsCard from '../components/Home/GoodsCard.vue';
import { getCommodityType } from '../server/commodity';

export default {
    components: { GoodsCard },
    name: 'Goods',
    props: {
        category: {
            type: String
        }
    },
    data () {
        return {
            commodity: null
        }
    },
    watch: {
        $route (newValue, oldValue) {
            this.requestCommodityType();
        }
    },
    computed: {
        pageTitle () {
            let title = '';

            switch (this.category) {
                case 'phone':
                    title = '手机';
                    break;
                case 'appliances':
                    title = '家电';
                    break;
                case 'travel':
                    title = '出行搭配';
                    break;
                case 'wear':
                    title = '智能穿戴';
                    break;
                case 'daily':
                    title = '日用百货';
                    break;
            }

            return title;
        }
    },
    mounted () {
        this.requestCommodityType();
    },
    methods: {
        requestCommodityType () {
            getCommodityType({ Type: this.category })
            .then( res => {
                this.commodity = res.data.data;
                console.log(res.data.data);
            })
            .catch(err => console.log(err));
        }
    }
}
</script>

<style lang="scss" scoped>

#goods {

    .top {
        background: white;
        border-top: 1px solid rgb(228, 227, 227);
        padding: 20px 0;

        > p {
            width: var(--main-width);
            margin: 0 auto;

            > span {

                &:first-child {
                    color: black;
                    font-weight: 800;
                }
            }
        }
    }

    .goods-main {
        background: #f5f5f5;
        padding: 30px 0;

        > .packing {
            width: var(--main-width);
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(5, 20%);

            > * {
                margin-top: 15px;
            }
        }
    }
}


</style>