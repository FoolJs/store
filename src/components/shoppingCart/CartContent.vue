<template>
    <div class="cart-content">

        <mask-com 
            v-if="maskShow"
            @cancel="maskShow = false"
            @determine="determineRemoveGoods"
            :value="value"
        ></mask-com>

        <div class="top row">

            <div class="check col">
                <input 
                    type="checkbox" 
                    id="all-check" 
                    v-model="isAll"
                    @click="checkAll"
                />
                <label for="all-check">全选</label>
            </div>

            <div class="img col"></div>

            <div class="name col">
                <span>商品名称</span>
            </div>

            <div class="price col">
                <span>单价</span>
            </div>

            <div class="sum col">
                数量
            </div>

            <div class="sub-total col">
                <span>小计</span>
            </div>

            <div class="caozuo col">
                <span>操作</span>
            </div>

        </div>


        <div 
            class="content row"
            v-for="(item, index) of shoppingCart"
            :key="index"
        >

            <div class="col check">
                <input 
                    type="checkbox"
                    :value="item"
                    v-model="list" 
                />
            </div>

            <div class="col img">
                <img 
                    :src="item.Cover" 
                    @click="$router.push({path: `/goods-details/${item.Name}`})" 
                />
            </div>

            <div class="col name">
                <span class="name-content">
                    {{ item.Name }}
                </span>
            </div>

            <div class="col price">
                <span>{{ item.Price }}元</span>
            </div>

            <div class="col sum input-num">
                <div class="input-num-packing">
                    <span class="subtract" @click="subtructInputSum(item)" >-</span>
                    <input 
                        type="text" 
                        :value="item.Sum"
                        @change="inputSum($event, item)"
                    />
                    <span class="add" @click="addInputSum(item)">+</span>
                </div>
            </div>

            <div class="col sub-total">
                <span class="xiaoji">{{ item.Price * item.Sum }}元</span>
            </div>

            <div class="col caozuo">
                <i class="mi icon-guanbi" @click="whetherRemoveGoods(item)"></i>
            </div>

        </div>


        <div class="bottom">
            <div class="left">
                <span class="continue" @click="$router.push({path: '/'})">继续购物</span>
                <span>共
                    <span style="color: orangered">
                        {{ shoppingCart.reduce( (pre, cur) => pre + cur.Sum, 0 ) }}
                    </span>
                    件商品，已选择
                    <span style="color: orangered">
                        {{ list.reduce( (pre, cur) => pre + cur.Sum, 0 ) }}
                    </span>
                    件
                </span>
            </div>

            <div class="right">
                <span class="right-total">合计：
                    <span style="fontSize: 30px">
                        {{ list.reduce( (pre, cur) => pre + cur.Sum * cur.Price, 0 ) }}
                    </span>元</span>
                <div @click="goAddress">去结算</div>
            </div>
        </div>

    </div>
</template>

<script>
import { updateShoppingCart } from '../../server/user.js';
import Message from '../BaseMessage/index.js';
import MaskCom from '../BaseMask/BaseMask.vue';

export default {
    name: 'CartContent',
    components: {
        MaskCom
    },
    props: {
        shoppingCart: {
            type: Array
        }
    },
    data () {
        return {
            // 全选反选绑定的属性
            isAll: false,
            // 用于选定的商品列表
            list: [],
            // 遮罩层是否显示
            maskShow: false,
            value: null
        }
    },
    watch: {
        list () {
            if ( this.list.length === this.shoppingCart.length ) {
                this.isAll = true;
            } else {
                this.isAll = false;
            }
        }
    },
    computed: {
        token () {
            return this.$store.state.token.token;
        }
    },
    methods: {
        goAddress () {
            if ( !this.token ) {
                this.$store.commit('openShow');
            } else {
                if ( this.list.length === 0 ) {
                    return;
                }
                this.$router.push({
                    name: 'Address',
                    params: {list: this.list}
                })
            }
        },
        whetherRemoveGoods (item) {
            this.maskShow = true;
            this.value = item;
        },
        determineRemoveGoods (item) {
            let index = this.shoppingCart.indexOf(item);
            this.shoppingCart.splice(index, 1);
            this.updateCart();
            this.value = null;
            this.maskShow = false;

            let i = 0;

            this.list.forEach( (l, _i) => {
                if ( this.shoppingCart.indexOf(l) === -1 ) {
                    i = _i;
                }
            } );

            this.list.splice(i, 1);
        },

        checkAll () {
            if ( this.isAll ) {
                this.list = [];
            } else {
                this.shoppingCart.forEach( item => {
                    if ( this.list.indexOf(item) === -1 ) {
                        this.list.push(item);
                    }
                } );
            }

        },
        inputSum (e, item) {
            let value = e.target.value;
            let asdw = item.Sum;


            if ( typeof value !== 'string' && typeof value !== 'number' ) {
                e.target.value = asdw;
                item.Sum = asdw;
                return;
            }

            let _value = Number(value);

            if ( isNaN(_value) ) {
                e.target.value = asdw;
                item.Sum = asdw;
                return;
            }

            if ( typeof _value === 'number' ) {
                if ( _value > 10 ) {
                    item.Sum = 10;
                } else {
                    item.Sum = _value;
                }

                this.updateCart();
            }

        },
        addInputSum (item) {
            if ( item.Sum < 10 ) {
                item.Sum++;
                this.updateCart();
            }
        },
        subtructInputSum (item) {
            if (item.Sum > 1) {
                item.Sum--;
                this.updateCart();
            }
        },
        updateCart () {
                updateShoppingCart({ShoppingCart: this.shoppingCart})
                .then(res => {
                    if ( res.data.type !== 'success' ) {
                        Message({
                            type: res.data.type,
                            message: res.data.type
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>

<style lang="scss" scoped>


.cart-content {
    width: var(--main-width);
    margin: 0 auto;
    margin-top: 20px;


    > .row {
        width: 100%;
        display: flex;
        padding: 20px;
        background: white;
        border-bottom: 1px solid rgb(241, 237, 237);
        box-sizing: border-box;

        > .col {
            display: flex;
            align-items: center;
            //border: 1px solid black;

        }

        > .check {
            width: 100px;
            //border: 1px solid red;

            > input {
                width: 18px;
                height: 18px;
                cursor: pointer;

            }

            > label {
                font-size: 16px;
                margin-left: 5px;
                cursor: pointer;
            }
        }

        > .img {
            width: 130px;

            img {
                width: 80px;
                height: 80px;
                cursor: pointer;
            }
        }

        > .price {
            width: 70px;
            justify-content: center;
        }

        > .sub-total {
            width: 100px;
            justify-content: center;
            //border: 1px solid red;
            
            > .xiaoji {
                color: orangered;
            }
        }

        > .caozuo {
            width: 100px;
            justify-content: center;

            i {
                font-size: 6px;
                cursor: pointer;
                font-weight: 800;
            }
        }

        > .name, > .sum {
            flex: 1;
        }

        > .name {

            > .name-content {
                font-size: 18px;
            }
        }

        > .sum {
            justify-content: center;
        }

        > .input-num {

            > .input-num-packing {
                display: flex;
                border: 1px solid rgb(230, 225, 225);
                
                > span {
                    width: 35px;
                    height: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 20px;
                    cursor: pointer;

                    &:hover {
                        background: rgba(0, 0, 0, 0.041);
                    }
                }

                > input {
                    width: 70px;
                    border: none;
                    text-align: center;
                }

            }


        }

    }



    > .bottom {
        width: 100%;
        display: flex;
        background: white;
        align-items: center;
        justify-content: space-between;
        color: #757575;

        > .left {

            .continue {
                cursor: pointer;
                margin-right: 20px;
                margin-left: 20px;

                &:hover {
                    color: orangered;
                }
            }
        }  

        > .right {
            display: flex;
            align-items: center;

            .right-total {
                color: orangered;
            }

            > div {
                background: orangered;
                color: white;
                padding: 18px;
                text-align: center;
                width: 200px;
                margin-left: 40px;
                cursor: pointer;

                &:hover {
                    background: rgb(240, 76, 17);
                }
            }
        }
    }

}

</style>