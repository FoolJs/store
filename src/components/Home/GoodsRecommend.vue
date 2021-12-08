<template>
    <div class="goods-recommend">
        <div class="box-head">
            <h2>{{ typeName }}</h2>
            <div class="box-head-right" @click="goGoodsType">
                <span>查看更多</span>
                <div class="goods-go">&gt;</div>
            </div>
        </div>


        <div class="box-content">

            <div class="box-left">
                <div 
                    class="box-left-content"
                    v-for="(item, index) of goodsContent.left"
                    :key="index"
                    @click="go(item.Name)"
                >
                    <img :src="item.src" />
                </div>
            </div>

            <div class="box-right">

                <goods-card
                    v-for="(item, index) of goodsContent.list"
                    :key="index"
                    :card="item"
                ></goods-card>

            </div>


        </div>


        
    </div>
</template>

<script>
import GoodsCard from './GoodsCard.vue';


export default {
    components: { GoodsCard },
    name: 'GoodsRecommend',
    props: {
        goodsContent: {
            type: Object
        }
    },
    mounted () {
        
    },
    methods: {
        goGoodsType () {
            this.$router.push({
                path: `goods/${this.goodsContent._id}`
            })
        },
        go (name) {
            this.$router.push({
                path: `goods-details/${name}`
            })
        }
    },
    computed: {
        typeName () {
            let typeName = '';
            switch (this.goodsContent._id) {
                case 'phone':
                    typeName = '手机';
                    break;
                case 'appliances':
                    typeName = '家电';
                    break;
                case 'wear':
                    typeName = '智能穿戴';
                    break;
                case 'travel': 
                    typeName = '出行搭配';
                    break;
                case 'daily':
                    typeName = '日用百货';
                    break;
            }

            return typeName;
        }
    }
}
</script>

<style lang="scss" scoped>

.goods-recommend {
    margin-bottom: 30px;

    > .box-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        

        > h2 {
            font-weight: 200;
            font-size: 22px;
        }

        > .box-head-right {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-right: 5px;

            > .goods-go {
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0.295);
                width: 18px;
                height: 18px;
                border-radius: 50%;
                color: white;

                margin-left: 5px;
            }

            &:hover .goods-go {
                color: white;
                background: orangered;
            }

            &:hover span {
                color: orangered;
            }

        }
    }

    > .box-content {
        height: 100%;
        width: 100%;
        display: flex;

        > .box-left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            > .box-left-content img {
                max-height: 615px;
                width: 234px;
                cursor: pointer;
                transition: all 300ms;

                &:hover {
                    box-shadow: 0px 5px 20px rgb(204, 202, 202);
                    transform: translateY(-5px);
                }


            }
        }

        > .box-right {
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            height: 615px;
        }
    }
}

</style>