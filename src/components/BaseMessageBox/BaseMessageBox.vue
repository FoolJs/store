<template>
    <div class="base-message-box">
        <div class="content">
            <p class="title">
                <span>
                    {{ title }}
                </span>
                <i 
                    class="mi icon-guanbi"
                    @click="$emit('cancel')"
                ></i>
            </p>

            <p class="message">
                <i :class="icon"></i>
                <span>
                    {{ message }}
                </span>
            </p>

            <div class="bottom">
                <div class="cancel" @click="$emit('cancel')">取消</div>
                <div class="determine" @click="$emit('determine', removeData)">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RemoveAddress',
    props: {
        // 消息的类型，决定了消息的Icon图标
        type: {
            type: String,
            default: 'info',
            validator (value) {
                return ['info', 'success', 'warning', 'error'].indexOf(value) !== -1;
            }
        },
        // 弹窗的标题
        title: {
            type: String,
            default: '提示'
        },
        // 弹窗的内容
        message: {
            type: String,
            default: '这是一条弹窗'
        },
        // 有时候我们可能需要传递数据给这个组件
        removeData: {
            default: null 
        }
    },
    computed : {
        icon () {
            let _class = {
                mi: true
            };

            switch (this.type) {
                case 'success':
                    _class['icon-chenggong'] = true;
                    break;
                case 'warning':
                    _class['icon-tixingshixin'] = true;
                    break;
                case 'error':
                    _class['icon-cuowu'] = true;
                    break;
                default:
                    _class['icon-infofill'] = true;
                    break;
            }

            return _class;
        }
    },
    mounted () {
        
    }
}
</script>

<style lang="scss" scoped>

.base-message-box {
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

    .content {
        width: 440px;
        background: white;
        box-sizing: border-box;
        padding: 10px 20px;
        border-radius: 3px;

        > .title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            > span {
                font-size: 18px;
                color: #303133;
            }

            > i {
                font-size: 8px;
                cursor: pointer;

                &:hover {
                    color: orangered;
                }
            }
        }

        > .message {
            margin-top: 20px;
            display: flex;
            align-items: center;

            i {
                font-size: 22px;
                margin-right: 10px;
            }

            span {
                color: #606266;
                line-height: 24px;
                font-size: 14px;
            }

            .icon-chenggong {
                color: rgb(131, 218, 1);
            }

            .icon-tixingshixin {
                color: rgb(219, 171, 12);
            }

            .icon-cuowu {
                color: rgb(231, 9, 9);
            }

            .icon-infofill {
                color: rgb(165, 164, 164);
            }
        }

        > .bottom {
            margin-top: 20px;
            display: flex;
            box-sizing: border-box;
            justify-content: flex-end;

            > div {
                color: white;
                padding: 6px;
                width: 60px;
                text-align: center;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
            }

            > .cancel {
                background: rgb(172, 169, 169);

                &:hover {
                    background: rgb(131, 130, 130);
                }
            }

            > .determine {
                background: orangered;
                margin-left: 20px;

                &:hover {
                    background: rgb(245, 40, 40);
                }
            }
        }
    }
}


</style>