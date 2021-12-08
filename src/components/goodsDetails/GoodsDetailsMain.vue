<template>
    <div class="goods-details-main">
        <div class="rotation-packing">
            <rotation v-if="details" indicator-style="rectangle">
                <rotation-item
                    v-for="(item, index) of details.RotationCover"
                    :key="index"
                    :index="index"
                >
                    <img :src="item" />
                </rotation-item>
            </rotation>
        </div>


        <div class="details-right" v-if="details">
            <p class="details-right-name">
                {{ details.Name }}
            </p>
            <div class="details-right-introduce">
                <div v-for="(item, index) of details.Introduce" :key="index">
                    <span>{{ item }}</span>
                    <span 
                    class="separate"
                    v-if="details.Introduce.indexOf(item) !== details.Introduce.length - 1" 
                    >/</span>
                </div>
            </div>
            <p class="xiaomiziying">
                小米自营
            </p>
            <p class="price">
                <span>{{ details.Price }}元</span>
                <del>{{ details.OriginalPrice }}元</del>
            </p>
            <div class="line"></div>


            <div class="selected-list">

                <div class="selected-list-top">
                    <span>{{ details.Name }}</span>
                    <p>
                        <span>{{ details.Price }}元</span>
                        <del>{{ details.OriginalPrice }}元</del>
                    </p>
                </div>

                <p class="total">
                    总计：{{details.Price}}元
                </p>

            </div>


            <div class="button-packing">
                <div @click="addShoppingCart">加入购物车</div>
                <div>
                    <i class="mi icon-xihuan-xianxing"></i>
                    喜欢
                </div>
            </div>

            <div class="details-right-bottom">

                <span v-for="(item, index) of list" :key="index">
                    <i class="mi icon-zhengquewancheng-xianxingyuankuang"></i>
                    {{ item }}
                </span>

            </div>


        </div>


    </div>
</template>

<script>
import Rotation from '../BaseRotation/Rotation.vue'
import RotationItem from '../BaseRotation/RotationItem.vue'
import { getAddShoppingCart } from '../../server/user.js';
import Message from '../BaseMessage/index.js';

export default {
    name: 'GoodsDetailsMain',
    components: {
        Rotation,
        RotationItem
    },
    props: {
        details: {
            type: Object
        }
    },
    data () {
        return {
            list: [
                '小米自营',
                '小米发货',
                '7天无理由退货',
                '运费说明',
                '企业信息',
                '30天价格保护',
            ]
        }
    },
    computed : {
        token () {
            return this.$store.state.token.token;
        }
    },
    methods: {
        addShoppingCart () {
            if ( !this.token ) {
                this.$store.commit('openShow');
            } else {
                getAddShoppingCart({
                    Name: this.details.Name
                })
                .then( res => {
                    Message({
                        type: res.data.type,
                        message: res.data.message
                    });
                })
                .catch( err => {
                    console.log(err);
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.goods-details-main {
    width: var(--main-width);
    margin: 0 auto;
    display: flex;

    > .rotation-packing {
        width: 560px;
        height: 560px;

        img {
            width: 560px;
            height: 560px;
        }
    }

    > .details-right {
        flex: 1;
        margin-left: 50px;
        display: flex;
        flex-direction: column;

        > .details-right-name {
            font-size: 24px;
            font-weight: 400;
            color: #212121;
            margin-bottom: 15px;
        }

        > .details-right-introduce {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            color: #b0b0b0;
            margin-bottom: 20px;

            .separate {
                margin: 0 5px;
            }
        }

        > .xiaomiziying {
            color: #ff6700;
            margin-bottom: 10px;
        }

        > .price {

            span {
                &:first-child {
                    color: #ff6700;
                }
            }

            del {
                color: #b0b0b0;
                font-size: 14px;
                margin-left: 5px;
            }
        }

        > .line {
            width: 100%;
            height: 1px;
            margin-top: 30px;
            background: rgb(230, 228, 228);
        }


        > .selected-list {
            background: #f9f9fa;
            padding: 30px 20px;
            margin-bottom: 30px;

            > .selected-list-top {
                display: flex;
                justify-content: space-between;
                color: #212121;
                font-size: 16px;

                p {

                    del {
                        margin-left: 10px;
                    }
                }

            }

                > .total {
                    font-size: 24px;
                    margin-top: 20px;
                    color: #ff6700;
                }

        }


        .button-packing {
            display: flex;
            margin-bottom: 30px;

            > div {
                padding: 15px 0;
                color: white;
                text-align: center;
                cursor: pointer;

                &:first-child {
                    background: orangered;
                    width: 300px;

                    &:hover {
                        background: rgb(243, 67, 3);
                    }
                }

                &:last-child {
                    background: rgb(199, 196, 196);
                    width: 150px;
                    margin-left: 10px;

                    i {
                        font-weight: 800;
                    }
                }
            }

        }

        .details-right-bottom {

            span {
                color: rgb(155, 152, 152);
                margin-right: 10px;
            }
        }


    }
}

</style>