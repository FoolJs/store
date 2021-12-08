<template>
    <div class="goods-card" @click="goDetails">
        <img :src="card.Cover" />
        <p class="card-title">
            {{ card.Name }}
        </p>
        <p class="card-introduce">
            {{ card.Introduce[0] }}
        </p>
        <p class="card-price">
            <span>{{ card.Price }}元</span>
            <span v-if="card.Price !== card.OriginalPrice" class="card-price-right">
                {{card.OriginalPrice}}元
            </span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'GoodsCard',
    props: {
        card: {
            type: Object
        }
    },
    methods: {
        goDetails () {
            this.$router.push({
                path: `/goods-details/${this.card.Name}`
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.goods-card {
    width: 234px;
    height: 300px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    cursor: pointer;
    transition: all 500ms;

    &:hover {
        box-shadow: 0px 5px 20px rgb(204, 202, 202);
        transform: translateY(-5px);
    }

    img {
        width: 160px;
        height: 160px;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .card-title {
        font-size: 14px;
        font-weight: 400;
        color: #333;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 70%;
        text-align: center;
    }

    .card-introduce {
        font-size: 12px;
        color: #b0b0b0;
        margin-top: 10px;
    }

    .card-price {
        color: #ff6700;
        margin-top: 10px;

        > .card-price-right {
            color: rgb(197, 193, 193);
            text-decoration:line-through;
        }
    }
}

</style>