<template>
    <div id="home">

        <rotation v-if="list.length" class="rotation">
            <rotation-item
                v-for="(item, index) of list"
                :key="index"
                :index="index"
            >
                <img :src="item.src" alt="轮播图" />
            </rotation-item>
        </rotation>

        <home-main></home-main>
    </div>
</template>

<script>
import Rotation from "../components/BaseRotation/Rotation.vue";
import RotationItem from "../components/BaseRotation/RotationItem.vue";
import HomeMain from '../components/Home/HomeMain.vue';
import { getRotation } from "../server/rotation.js";

export default {
    name: "Home",
    components: {
        Rotation,
        RotationItem,
        HomeMain,
    },
    data() {
        let list = [];

        return {
            list,
        };
    },
    mounted () {


        getRotation()
        .then( res => {
            this.list = res.data.data;
            this.asdw = true;
        })
        .catch(err => console.log(err))

    }
};
</script>


<style lang="scss" scoped>
#home {
    width: 100%;
    
    .rotation {
        width: var(--main-width);
        margin: 0 auto 20px auto;
    }

    img {
        max-width: 100% !important;
        height: 100% !important;
    }
}
</style>