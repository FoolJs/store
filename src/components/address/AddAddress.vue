<template>
    <div class="add-address">
        <div class="content">

            <div class="top">
                <span>添加收货地址</span>
                <i 
                    class="mi icon-guanbi"
                    @click="$emit('cancel')"
                ></i>
            </div>

            <div class="main">
                <p> 
                    <input 
                        type="text" 
                        placeholder="姓名" 
                        v-model="addressMessage.name" 
                        maxlength="10"
                    />
                    <input 
                        type="text" 
                        placeholder="手机号" 
                        v-model="addressMessage.phone"
                        maxlength="11"
                    />
                </p>
                <p>
                    <textarea 
                        placeholder="详细地址"
                        v-model="addressMessage.detailed"
                    ></textarea>
                </p>
            </div>

            <div class="bottom">
                <div class="yes" @click="go">确定</div>
                <div class="no" @click="$emit('cancel')">取消</div>
            </div>

        </div>
    </div>
</template>

<script>
// cancel事件在点击取消按钮时触发

export default {
    name: 'AddAddress',
    data () {
        return {
            addressMessage: {
                name: '张三',
                phone: '18888888888',
                detailed: '河南省开封市'
            }
        }
    },
    methods: {
        go () {

            for (const key in this.addressMessage) {
                if (Object.hasOwnProperty.call(this.addressMessage, key)) {
                    const element = this.addressMessage[key];
                    if ( element.length === 0 ) {
                        return;
                    }
                }
            }
            this.$emit('determine', this.addressMessage);
            this.$emit('cancel');
        }
    }
}
</script>

<style lang="scss" scoped>

.add-address {
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.288);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;

    > .content {
        width: 660px;
        background: white;

        > .top {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            background: #f5f5f5;

            > span {
                font-size: 18px;
                font-weight: 400;
            }

            > i {
                cursor: pointer;
            }
        }

        > .main {
            background: white;
            padding: 20px;

            p {
                display: flex;
                justify-content: space-between;

                textarea {
                    width: 100%;
                    border: 1px solid rgb(214, 212, 212);
                    margin-top: 20px;
                    outline: none;
                    height: 100px;
                    font-size: 16px;
                    padding: 10px 5px;
                    box-sizing: border-box;
                }

                input {
                    width: 300px;
                    padding: 10px 5px;
                    border: 1px solid rgb(214, 212, 212);
                    box-sizing: border-box;
                }
            }
        }

        > .bottom {
            background: #f5f5f5;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;

            > div {
                color: white;
                width: 160px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &:first-child {
                    background: orangered;
                    margin-right: 10px;

                    &:hover {
                        background: rgb(247, 112, 64);
                    }
                }

                &:last-child {
                    background: rgb(190, 190, 190);
                    margin-left: 10px;

                    &:hover {
                        background: rgb(185, 184, 184);
                    }
                }
            }
        }
    }
}

</style>