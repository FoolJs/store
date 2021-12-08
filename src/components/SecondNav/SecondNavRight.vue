<template>
    <div class="second-nav-right">
        <ul class="second-nav-right-list">
            <li
                v-for="item of navList"
                :key="item.id"
            ><router-link :to="item.path">{{ item.name }}</router-link></li>
        </ul>

        <div class="search">
            <input type="search" />
            <div class="search-icon">
                <i class="mi icon-search1"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SecoundNavRight',
    props: {
        navList: {
            type: Array,
        }
    }
}
</script>

<style lang="scss" scoped>

.second-nav-right {
    flex: 8;
    display: flex;

    .second-nav-right-list {
        display: flex;

        > li {
            margin-right: 20px;

            &:hover {
                color: orangered;
            }

            > a {
                display: block;
                padding: 15px 0;
            }
        }
    }
    .search {
        display: flex;
        align-items: center;
        margin-left: auto;

        input, .search-icon {
            height: 45px;
            border: 1px solid rgb(202, 198, 198);
        }

        .search-icon {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;

            width: 45px;
            border-left: none;
            cursor: pointer;

            &:hover {
                background: orangered;
                color: white;
            }
        }
    }
}

</style>