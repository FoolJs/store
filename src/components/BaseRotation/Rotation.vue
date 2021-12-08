<template>
    <div class="base-rotation" :style="rotationHeight">
        <div
            class="base-rotation-inner"
            @mouseenter="closeAutoPlay"
            @mouseleave="autoplay ? timingGo() : true"
        >
            <div
                class="base-rotation-arrow base-rotation-arrow-left"
                @click="turnPage('contrary')"
            >
                &lt;
            </div>
            <div
                class="base-rotation-arrow base-rotation-arrow-right"
                @click="turnPage('normal')"
            >
                &gt;
            </div>
            <slot></slot>
        </div>

        <div
            :class="{
                'base-rotation-indicator-circular': indicatorStyle === 'circular',
                'base-rotation-indicator-rectangle': indicatorStyle === 'rectangle',
            }"
        >
            <div
                class="base-rotation-indicator-item"
                v-for="(item, index) of subList"
                :key="index"
                :class="{
                    'base-select-rotation-indicator-item':
                        item.index === currentIndex,
                }"
                @click="selectItem(item.index)"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Rotation",
    props: {
        // 轮播图的高度
        height: {
            type: String,
            default: "500px",
        },
        // 是否自动轮播
        autoplay: {
            type: Boolean,
            default: true,
        },
        // 自动轮播的间隔时长
        interval: {
            type: Number,
            default: 3000,
        },
        // 从哪一张开始轮播
        intervalIndex: {
            type: Number,
        },
        // 播放顺序，默认正序
        order: {
            type: String,
            default: "normal",
            validator(value) {
                return ["normal", "contrary"].indexOf(value) !== -1;
            },
        },
        indicatorStyle: {
            type: String,
            default: 'circular'
        },
        length: {
            type: Number,
        },
    },
    data() {
        // 确定轮播的起始索引
        let currentIndex = 0;
        if (this.intervalIndex) {
            currentIndex = this.intervalIndex;
        } else {
            if (this.order === "contrary") {
                currentIndex = this.$slots.default.length - 1;
            }
        }

        let lastIndex = this.$slots.default.length - 1;

        return {
            // 轮播的起始索引
            currentIndex,
            // 默认情况下最后一项的索引
            lastIndex,
            // 定时器ID
            timerId: null,
            subList: null,
        };
    },
    mounted() {
        // 是否自动轮播
        if (this.autoplay) {
            this.timingGo();
        }
        // 在子组件加载完毕后获取子组件列表
        this.subList = this.$children;
    },
    beforeDestroy() {
        this.closeAutoPlay();
    },
    computed: {
        // 轮播的高
        rotationHeight() {
            return { height: this.height };
        },
    },
    methods: {
        // 轮播
        timingGo() {
            let _this = this;

            this.closeAutoPlay();

            this.timerId = setTimeout(function go() {
                _this.jumpIndex(_this.order);
                _this.timerId = setTimeout(go, _this.interval);
            }, this.interval);
        },
        turnPage(order) {
            this.closeAutoPlay();
            this.jumpIndex(order);

            if (this.autoplay) {
                this.timingGo();
            }
        },
        // 跳转到某张轮播
        selectItem(index) {
            this.closeAutoPlay();
            this.currentIndex = index;

            if (this.autoplay) {
                this.timingGo();
            }
        },
        // 跳转轮播页的逻辑
        jumpIndex(order) {
            switch (order) {
                case "normal":
                    if (this.currentIndex < this.lastIndex) {
                        this.currentIndex++;
                    } else {
                        this.currentIndex = 0;
                    }
                    break;
                case "contrary":
                    if (this.currentIndex > 0) {
                        this.currentIndex--;
                    } else {
                        this.currentIndex = this.lastIndex;
                    }
                    break;
            }
        },
        closeAutoPlay() {
            clearTimeout(this.timerId);
            this.timerId = null;
        },
    },
};
</script>

<style lang="scss" scoped>
.base-rotation {
    width: 100%;
    position: relative;
    overflow: hidden;

    > .base-rotation-inner {
        width: 100%;
        height: 100%;
        position: relative;

        .base-rotation-arrow {
            position: absolute;
            top: 45%;
            padding: 15px 10px;
            color: rgba(192, 189, 189, 0.555);
            color: rgba(216, 213, 213, 0.555);
            font-size: 2em;
            cursor: pointer;
            z-index: 9;

            &:hover {
                background: rgba(0, 0, 0, 0.411);
                color: white;
            }
        }

        .base-rotation-arrow-left {
            left: 0;
        }
        .base-rotation-arrow-right {
            right: 0;
        }
    }

    > .base-rotation-indicator-circular {
        position: absolute;
        bottom: 15px;
        right: 40px;
        display: flex;

        > .base-rotation-indicator-item {
            height: 8px;
            width: 8px;
            border: 1px solid #a8a6a6;
            border-radius: 50%;

            margin: 0 4px;
            background: #a8a6a6;
            cursor: pointer;
        }

        > .base-select-rotation-indicator-item {
            background: rgba(238, 237, 237, 0.658);
        }
    }





    > .base-rotation-indicator-rectangle {
        position: absolute;
        bottom: 10px;
        right: 40px;
        display: flex;
        width: 500px;
        justify-content: center;

        > .base-rotation-indicator-item {
            height: 3px;
            width: 50px;
            border: 1px solid #a8a6a6;

            margin: 0 4px;
            background: #d4d2d2;
            cursor: pointer;
        }

        > .base-select-rotation-indicator-item {
            background: rgba(126, 124, 124, 0.849);
        }
    }







}
</style>