<template>

    <transition name="fade">

    <div class="base-rotation-item" v-show="index === currentIndex">
        <slot></slot>
    </div>

    </transition>

</template>

<script>
export default {
    name: 'RotationItem',
    props: {
        // 用于规定显示哪张轮播图
        // 在用v-for的时候需要将索引赋给它
        index: {
            type: Number,
            default: 0
        } 
    },
    data () {
        return {
            
        }
    },
    mounted () {
        
    },
    computed: {
        currentIndex () {
            return this.$parent.currentIndex;
        }
    }
}
</script>

<style lang="scss" scoped>

.base-rotation-item {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
}









.turn-enter-active,
.turn-leave-active,
.fade-enter-active,
.fade-leave-active,
.negativeTurn-enter-active,
.negativeTurn-leave-active {
    transition: all 450ms ease;
}
.turn-enter,
.negativeTurn-leave-to {
    transform: translateX(100%);
}
.turn-enter-to,
.turn-leave,
.negativeTurn-enter-to,
.negativeTurn-leave {
    transform: translateX(0);
}
.turn-leave-to,
.negativeTurn-enter {
    transform: translateX(-100%);
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to,
.fade-leave {
    opacity: 1;
}




</style>