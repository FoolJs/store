<template>
    <div class="address-main">
        <add-address
            v-if="addAddressIsShow"
            @cancel="addAddressIsShow = false"
            @determine="requestAddAddress"
        ></add-address>

        <remove-address
            v-if="removeAddressIsShow"
            message="是否确定删除？"
            :removeData="removeData"
            type="warning"
            @cancel="removeAddressIsShow = false"
            @determine="determineRemove"
        ></remove-address>

        <h3>收货地址</h3>
        <div class="address-list">

            <div 
                class="address-item address-item-content"
                v-for="(item, index) of addressList"
                :key="index"
                @click="useAddress = item"
                :class="{'select-item': item === useAddress}"
            >
                <p class="x">
                    <i 
                        class="mi icon-guanbi"
                        @click="openRemoveBox(item)"
                    ></i>
                </p>
                <p class="name">{{ item.name }}</p>
                <p class="phone">{{ item.phone }}</p>
                <p class="message">{{ item.detailed }}</p>
            </div>

            <div 
                class="address-item address-item-add"
                @click="addAddressIsShow = true"
                v-if="addressList.length <= 3"
            >
                <i class="mi icon-tianjia"></i>
                <span>添加新地址</span>
            </div>

        </div>


        <h3>商品及优惠券</h3>

        <div class="goods-list">

            <div 
                class="goods-item"
                v-for="(item, index) of goodsList"
                :key="index"
            >

                <img :src="item.Cover" />

                <span 
                    class="name" 
                    @click="$router.push({path: `/goods-details/${item.Name}`})"
                >
                    {{ item.Name }}
                </span>

                <span class="price-sum">
                    {{ item.Price + '元' + ' x ' + item.Sum }}
                </span>

                <span class="subtotal">
                    {{ item.Price * item.Sum + '元' }}
                </span>

            </div>

        </div>


        <div class="distribution-mode dis-inv">
            <h3>
                配送方式
            </h3>

            <span>
                快递配送（运费 10 元）
            </span>
        </div>

        <div class="invoice dis-inv">
            <h3>发票</h3>
            <span>电子发票</span>
            <span>个人</span>
            <span>商品明细</span>
        </div>


        <div class="count-detail">
            <div class="count-detail-main">
                <div class="detail-item">
                    <span>
                        商品件数：
                    </span>
                    <span>
                        {{ goodsList.reduce( (pre, cur) => pre + cur.Sum, 0 ) }}件
                    </span>
                </div>

                <div class="detail-item">
                    <span>
                        商品总价：
                    </span>
                    <span>
                        {{ goodsList.reduce( (pre, cur) => pre + cur.Price * cur.Sum, 0 ) }}元
                    </span>
                </div>

                <div class="detail-item">
                    <span>
                        活动优惠：
                    </span>
                    <span>
                        -0元
                    </span>
                </div>
                <div class="detail-item">
                    <span>
                        优惠券折扣：
                    </span>
                    <span>
                        -0元
                    </span>
                </div>
                <div class="detail-item">
                    <span>
                        运费：
                    </span>
                    <span>
                        10元
                    </span>
                </div>
                <div class="detail-item all-sum">
                    <span>
                        应付总额：
                    </span>
                    <span>
                        {{ goodsList.reduce( (pre, cur) => pre + cur.Price * cur.Sum, 0 ) + 10 }}元
                    </span>
                </div>
            </div>
        </div>


        <div class="bottom">
            <div 
                class="go-to-shopping"
                @click="$router.push({path: '/shopping-cart'}).catch(err => err)"
            >
                返回购物车
            </div>

            <div class="jiesuan" @click="gojiesuan">
                结算
            </div>
        </div>


    </div>
</template>

<script>
import { addAddressMessage, removeAddressMessage, placeOrder } from '../../server/user.js';
import Message from '../BaseMessage/index.js';

export default {
    name: 'AddressMain',
    components: {
        AddAddress: () => import('./AddAddress.vue'),
        RemoveAddress: () => import('../BaseMessageBox/BaseMessageBox.vue')
    },
    props: {
        addressList: {
            type: Array
        },
        goodsList: {

        }
    },
    data () {
        return {
            addAddressIsShow: false,
            removeAddressIsShow: false,
            removeData: null,
            useAddress: undefined
        }
    },
    methods: {
        requestAddAddress(data) {

            addAddressMessage(data)
            .then( res => {
                Message({
                    type: res.data.type,
                    message: res.data.message
                });

                if ( res.data.type === 'success' ) {
                    this.$emit('request-list');
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        openRemoveBox (item) {
            this.removeData = item;
            this.removeAddressIsShow = true;
        },
        determineRemove (item) {
            this.removeAddressIsShow = false;
            console.log(item);

            removeAddressMessage(item)
            .then( res => {
                Message({
                    type: res.data.type,
                    message: res.data.message
                });

                this.$emit('request-list');
                this.useAddress = undefined;
            })
            .catch(err => {
                console.log(err);
            })
        },
        gojiesuan () {
            if ( !this.useAddress ) {
                Message({
                    type: 'warning',
                    message: '请选择收货地址'
                });
                return;
            }
            if ( this.goodsList.length === 0 ) {
                Message({
                    type: 'warning',
                    message: '购物车为空！'
                });
                return;
            }

            placeOrder({
                GoodsList: this.goodsList,
                Addrsss: this.useAddress
            })
            .then( res => {
                Message({
                    type: res.data.type,
                    message: res.data.message
                });
            })
            .catch(err => {
                console.log(err);
            })








        }
    }
}
</script>

<style lang="scss" scoped>

.address-main {
    width: var(--main-width);
    margin: 0 auto;
    background: white;
    padding: 20px 20px;

    > h3 {
        color: #333;
        font-size: 18px;
        font-weight: 400;
        margin-top: 30px;
    }

    > .address-list {
        display: flex;
        margin-top: 30px;
        margin-left: 25px;

        > .address-item {
            width: 268px;
            height: 178px;
            border: 1px solid rgb(218, 215, 215);
            cursor: pointer;
            margin-right: 20px;
        }

        > .select-item {
            border: 1px solid orangered;
        }

        > .address-item-content {

            &:hover {
                border: 1px solid rgb(185, 183, 183);
            }

            &:hover > .x i {
                visibility: visible;
            }

            > .x {
                text-align: right;
                margin-top: 10px;

                i {
                    margin-right: 10px;
                    font-size: 12px;
                    cursor: pointer;
                    visibility: hidden;

                    &:hover {
                        color: red;
                    }
                }
            }

            > .name {
                margin-left: 20px;
                margin-top: 7px;
                font-size: 18px;
            }

            > .phone {
                margin-top: 20px;
                margin-left: 17px;
                font-size: 14px;
            }

            > .message {
                margin-top: 10px;
                margin-left: 20px;
            }
        }

        > .address-item-add {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &:hover {
                border: 1px solid rgb(185, 183, 183)
            }

            &:hover i {
                color: rgb(182, 179, 179);
            }

            > i {
                font-size: 35px;
                color: rgb(216, 211, 211);
            }

            > span {
                color: rgb(177, 169, 169);
            }
        }
    }

    > .goods-list {
        margin-top: 40px;

        > .goods-item {
            display: flex;
            align-items: center;
            padding: 0 20px;
            margin-bottom: 30px;

            > img {
                width: 32px;
                height: 32px;
                margin-right: 10px;
            }

            > .name {
                color: #424242;
                font-size: 14px;
                flex: 6;
                cursor: pointer;
            }

            > .price-sum {
                color: #424242;
                font-size: 14px;
                flex: 2;
            }

            > .subtotal {
                margin-left: auto;
                font-size: 14px;
                color: orangered;
            }
        }
    }

    > .dis-inv {
        border-top: 1px solid rgb(230, 227, 227);
        padding: 30px 0;
        display: flex;
        align-items: center;

        > h3 {
            color: #333;
            font-size: 18px;
            font-weight: 400;
        }

        > span {
            margin-left: 50px;
            color: #ff6700;
            font-size: 14px;
        }
    }


    > .invoice {
        border-bottom: 1px solid rgb(230, 227, 227);
        margin-bottom: 30px;
    }

    > .count-detail {
        border-bottom: 1px solid rgb(230, 227, 227);

        > .count-detail-main {
            width: 250px;
            margin-left: auto;
            margin-right: 30px;

            > .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 10px 0;

                > span {

                    &:first-child {
                        color: #757575;
                    }

                    &:last-child {
                        color: orangered;
                    }
                }
            }

            > .all-sum {
                margin-top: 15px;

                span {

                    &:last-child {
                        font-size: 30px;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }

    > .bottom {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;

        > div {
            margin-right: 10px;
            width: 150px;
            padding: 7px 0;
            text-align: center;
            cursor: pointer;
        }

        > .go-to-shopping {
            background: white;
            border: 1px solid rgb(158, 155, 155);
            color: rgb(192, 187, 187);
        }

        > .jiesuan {
            background: orangered;
            color: white;
        }
    }

}


</style>