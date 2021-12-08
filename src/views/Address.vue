<template>
    <div id="address">
        
        <div class="nav">
            <div class="nav-main">
                <p class="left">
                    <i class="mi icon-bokexinwen"></i>
                    <span>确认订单</span>
                </p>
            </div>
        </div>

        <address-main 
            :address-list="addressList"
            :goods-list="$route.params.list"
            @request-list="requestAddressList"
        ></address-main>

    </div>
</template>

<script>
import { getAddressList } from '../server/user.js';

export default {
    name: 'Address',
    components: {
        AddressMain: () => import('../components/address/AddressMain.vue')
    },
    data () {
        return {
            addressList: []
        }
    },
    mounted () {
        if ( !this.$route.params.list ) {
            this.$router.push({path: '/shopping-cart'}).catch(err => err)
        } else {
            this.requestAddressList();
        }
    },
    methods: {
        requestAddressList () {

            getAddressList({})
            .then( res => {
                this.addressList = res.data.AddressList;
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>

#address {
    background: #f5f5f5;
    padding-bottom: 50px;

    > .nav {
        width: 100%;
        border-bottom: 2px solid orangered;
        background: white;
        margin-bottom: 50px;

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
        }
    }

}

</style>