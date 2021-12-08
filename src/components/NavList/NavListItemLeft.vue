<template>
    <ul class="nav-list-item-left">
        <router-link
            v-for="item of navListLeft"
            :key="item.id"
            :to="item.path"
            >{{ item.name }}</router-link>
    </ul>
</template>

<script>
export default {
    name: 'NavListItemLeft',
    props: {
        navListLeft: {
            type: Array
        }
    }
}
</script>

<style lang="scss" scoped>

.nav-list-item-left {
    display: flex;
    align-items: center;

    > a {
        margin-right: 15px;
        padding: 1em 0;

        &:hover {
            color: white;
        }
    }
}

</style>