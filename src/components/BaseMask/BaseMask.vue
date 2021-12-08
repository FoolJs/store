<template>
    <div class="base-mask">
        <div class="content">
            <div class="top">
                <p class="cancel">
                    <i class="mi icon-guanbi" @click="$emit('cancel')"></i>
                </p>
                <p class="wen">
                    <slot>确定删除吗？</slot>
                </p>
            </div>
            <div class="bottom">
                <div class="yes" @click="$emit('determine', value)">确定</div>
                <div class="no" @click="$emit('cancel')">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
// cancel事件用来在点击取消按钮和X时候触发
// determine事件用来点击确定按钮时触发

export default {
    name: 'BaseMask',
    props: {
        value: {
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>

.base-mask {
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
        width: 30%;
        background: white;

        > .top {

            .cancel {
                text-align: right;
                padding: 0 20px;
                margin-top: 20px;
                
                i {
                    cursor: pointer;
                }
            }

            .wen {
                text-align: center;
                margin-top: 20px;
                margin-bottom: 20px;
                font-size: 18px;
            }
        }

        > .bottom {
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            padding: 20px 0;

            > .yes, .no {
                width: 120px;
                padding: 8px;
                text-align: center;
                color: white;
                cursor: pointer;
            }

            > .yes {
                background: orangered;
                margin-right: 5px;

                &:hover {
                    background: rgb(250, 115, 66);
                }
            }
            > .no {
                background: #b0b0b0;
                margin-left: 5px;

                &:hover {
                    background: #868585;
                }
            }
        }
    }
}

</style>