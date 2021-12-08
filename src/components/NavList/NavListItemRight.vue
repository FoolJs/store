<template>
    <ul class="nav-list-item-right">

        <li 
            v-if="logined" 
            @mouseover="menuShow = true" 
            @mouseleave="menuShow = false"
            class="user"
        >
            <span>{{ details.Email }}</span>

            <transition name="menu-show">
            <div class="menu" v-show="menuShow">
                <li>个人中心</li>
                <li>评价晒单</li>
                <li>我的喜欢</li>
                <li>小米账户</li>
                <li @click="signOut">退出登录</li>
            </div>
            </transition>

        </li>

        <li v-if="logined"><span>消息通知</span></li>
        <li v-if="logined"><span>我的订单</span></li>

        <li @click="openLogin" v-if="!logined"><span>登录</span></li>
        <li @click="openRegister" v-if="!logined"><span>注册</span></li>

        <div class="sh-cart" 
            @mouseenter="getShoppingCart" 
            @mouseleave="cartIsShow = false"
            @click="goShCart"
        >
            <i class="mi icon-gouwuchekong"></i>
            <span style="margin-left: 10px">购物车</span>
            <span>（{{ sum }}）</span>

        <transition name="menu-show">
            <div class="sh-cart-content" v-if="cartIsShow">
                <div class="no-login" v-if="noLogin">您还未登录，请您先登录吧！</div>

                <div 
                    class="goods" 
                    v-for="(item, index) of ShoppingCart"
                    :key="item.Name"
                >
                    <div class="left">

                    <img :src="item.Cover" />
                    <span class="goods-name">
                        {{ item.Name }}
                    </span>

                    </div>

                    <span class="goods-price">
                        {{item.Price + '元' + ' x ' + item.Sum}}
                    </span>
                </div>


                <div class="bottom" v-if="!noLogin">
                    <div class="bottom-left">
                        <span>共计{{sum}}件商品</span>
                        <span>{{ total }}元</span>
                    </div>
                    <div class="button" @click="$router.push({path: '/shopping-cart'})">
                        去购物车结算
                    </div>
                </div>


            </div>
        
        </transition>

        </div>
    </ul>
</template>

<script>
import { getUserNameCart } from '../../server/user.js';
import Message from '../BaseMessage/index.js';
import { requestShoppingCart } from '../../server/user.js';
import token from '../../store/token.js';

export default {
    name: 'NavListItemRight',
    computed: {
        token () {
            return this.$store.state.token.token;
        }
    },
    watch: {
        token (newValue) {
            if (newValue) {
                this.isLogin ();
            } else {
                this.logined = false;
                this.details = null;
                this.sum = 0;
                this.menuShow = false;
            }
        }
    },
    methods: {
        goShCart () {
            if ( !this.token ) {
                this.$store.commit('openShow');
            } else {
                this.$router.push({path: '/shopping-cart'}).catch(err => err)
            }
        },
        getShoppingCart () {
            this.cartIsShow = true;
            requestShoppingCart({})
            .then( res => {
                if ( res.data.type !== 'success' ) {
                    this.noLogin = true;
                    this.ShoppingCart = [];
                    this.total = 0;
                } else {
                    this.noLogin = false;
                    this.ShoppingCart = res.data.ShoppingCart;

                    this.sum = res.data.ShoppingCart.reduce( (pre, cur) => {
                        return pre + cur.Sum;
                    }, 0 );

                        this.total = this.details.ShoppingCart.reduce( (pre, cur) => {
                        return pre + cur.Price * cur.Sum;
                        }, 0 );
                }
            })
            .catch(err => {
                console.log(err);
            })

        },
        signOut () {
            this.logined = false;
            this.menuShow = false;
            this.$store.commit('deleteToken');
            Message({
                type: 'success',
                message: '成功退出登录！'
            })
        },
        openLogin () {
            this.$store.commit('changePattern', '登录');
            this.$store.commit('openShow');
        },
        openRegister () {
            this.$store.commit('changePattern', '注册');
            this.$store.commit('openShow');
        },
        isLogin () {
            if (!this.token) {
                this.logined = false;
                this.details = null;
            } else {
                getUserNameCart({})
                .then( res => {
                    if ( res.data.type !== 'success' ) {
                        this.logined = false;
                        this.details = null;
                    } else {
                        this.logined = true;
                        this.details = res.data.data;

                        this.sum = this.details.ShoppingCart.reduce( (pre, cur) => {
                            return pre + cur.Sum;
                        }, 0 );

                    }
                })
                .catch( err => {
                    console.log(err);
                })
            }
        }
    },
    data () {
        return {
            logined: false,
            details: null,
            sum: 0,
            menuShow: false,
            noLogin: true,
            cartIsShow: false,
            ShoppingCart: [],
            total: 0
        }
    },
    mounted () {
        this.isLogin();
    },
}
</script>

<style lang="scss" scoped>

.nav-list-item-right {
    display: flex;
    margin-left: auto;
    position: relative;

        .user {
            position: relative;

            > span {
                padding: 0 8px;
            }

            .menu {
                background: white;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                z-index: 9;
                box-shadow: 0px 2px 5px #c5c4c4;
                color: black;

                > li {
                    text-align: center;
                    padding: 7px 10px;

                    &:hover {
                        background: rgb(252, 246, 246);
                        color: orangered;
                    }
                }
            }

            &:hover {
                background: white;
            }
            &:hover > span {
                color: orangered;
            }
        }




    > li {
        margin-right: 10px;
        padding: 1em 0;
        cursor: pointer;

        span, i {
            line-height: 20px;
        }

        &:hover span {
            color: white;
        }
    }

    > .sh-cart {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;

        margin-left: 1em;
        padding: 0 10px;

        background: rgba(255, 255, 255, 0.055);

        &:hover {
            background: white;
        }

        &:hover > span {
            color: orangered;
        }



        > .sh-cart-content {
            position: absolute;
            z-index: 9;
            background: white;
            box-shadow: 0px 2px 5px #c5c4c4;
            top: 100%;
            right: 0;
            width: 300px;
            min-height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 20px 20px 10px 18px;

            > .no-login {
                text-align: center;
            }


            > .goods {
                width: 100%;
                padding: 5px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: black;
                border-bottom: 1px solid rgb(228, 224, 224);


                > .left {
                    display: flex;
                    align-items: center;

                    > .goods-name {
                        width: 120px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }

                    img {
                        width: 60px;
                        height: 60px;
                    }

                }

                > .goods-price {
                    margin-right: 20px;
                }

            }


            .bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: black;
                padding: 20px 0;

                .bottom-left {
                    display: flex;
                    flex-direction: column;
                    span {

                        &:last-child {
                            color: orangered;
                            font-size: 25px;
                        }
                    }
                }

                .button {
                    background: rgb(250, 83, 22);
                    color: white;
                    width: 120px;
                    padding: 12px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 13px;

                    &:hover {
                        background: rgb(233, 114, 70);
                    }
                }
            }


        }

    }
}

.menu-show-leave-active,
.menu-show-enter-active {
    transition: all 200ms;
}

.menu-show-enter {
    opacity: 0;
}

.menu-show-enter-to {
    opacity: 1;
}

.menu-show-leave {
    opacity: 1;
}

.menu-show-leave-to {
    opacity: 0;
}



</style>