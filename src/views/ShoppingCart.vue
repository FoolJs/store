<template>
    <div id="shopping-cart">
        <div class="nav">
            <div class="nav-main">
                <p class="left">
                    <i class="mi icon-gouwuchekong"></i>
                    <span>我的购物车</span>
                </p>
                <p class="right">
                    温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算
                </p>
            </div>
        </div>


        <div class="content">
            <cart-content :shoppingCart="shoppingCart"></cart-content>
        </div>


    </div>
</template>

<script>
import { requestShoppingCart } from '../server/user.js';

export default {
    name: 'ShoppingCart',
    components: {
        CartContent: () => import('../components/shoppingCart/CartContent.vue')
    },
    data () {
        return {
            shoppingCart: []
        }
    },
    mounted () {
        requestShoppingCart({})
        .then( res => {
            if ( res.data.type !== 'success' ) {
                this.shoppingCart = [];
            } else {
                this.shoppingCart = res.data.ShoppingCart;
            }
        })
    }
}
</script>

<style lang="scss" scoped>

#shopping-cart {
    height: 100%;

    > .nav {
        width: 100%;
        border-bottom: 2px solid orangered;
        background: white;

        > .nav-main {
            width: var(--main-width);
            margin: 0 auto;
            display: flex;
            border-top: 1px solid rgb(243, 238, 238);
            padding: 20px 0;
            align-items: center;

            > .left {
                margin-right: 15px;

                > i {
                    font-size: 25px;
                    color: orangered;
                    margin-right: 15px;
                }

                > span {
                    font-size: 30px;
                }
            }

            > .right {
                color: #757575;
                font-size: 12px;
                margin-top: 17px;
            }
        }
    }

    > .content {
        background: #f5f5f5;
        padding: 15px 0;
    }
}


</style>