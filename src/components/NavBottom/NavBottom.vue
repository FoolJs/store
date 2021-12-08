<template>
    <nav class="nav-bottom">
        <div class="top">
            <div v-for="(item, index) of list" :key="index">
                <i :class="item.icon"></i>
                <span>
                    {{item.name}}
                </span>
            </div>
        </div>

        <div class="line"></div>

        <div class="bottom">
            <a :href="item.href" v-for="(item, index) of list2" :key="index">
                <i :class="item.icon"></i>
            </a>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBottom',
    data () {
        return {
            list: [
                {icon: 'mi icon-shouhoufuwu', name: '预约维修服务'},
                {icon: 'mi icon-7', name: '7天无理由退货'},
                {icon: 'mi icon-15', name: '15天免费换货'},
                {icon: 'mi icon-liwu', name: '满69包邮'},
                {icon: 'mi icon-didian', name: '520余家售后网点'},
            ],
            list2: [
                {href: 'https://github.com/FoolJs', icon: 'mi icon-github-fill'},
                {href: '/', icon: 'mi icon-QQ'},
                {href: 'http://www.foolman.top/', icon: 'mi icon-bokexinwen'},
            ]
        }
    },
    mounted () {









    }
}
</script>

<style lang="scss" scoped>

.nav-bottom {
    padding: 30px 0;

    .top {
        width: var(--main-width);
        margin: 0 auto;
        display: flex;

        > div {
            flex: 1;
            border-right: 1px solid rgb(214, 212, 212);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &:hover {
                color: orangered;
            }

            > i {
                font-size: 25px;
                margin-right: 5px;
            }

            &:last-child {
                border-right: 0px;
            }
        }
    }

    .line {
        width: var(--main-width);
        height: 1px;
        background: rgb(214, 211, 211);
        margin: 20px 0 30px 0;
    }

    .bottom {
        width: var(--main-width);
        display: flex;
        justify-content: center;

        a {
            margin: 0 10px;
        }

        i {
            font-size: 2em;
        }
    }
}

</style>