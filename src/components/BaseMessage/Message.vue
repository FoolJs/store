<template>
    <aside class="base-message" :style="style">
        <i class="mi icon-chenggong" v-if="type === 'success'"></i>
        <i class="mi icon-tixingshixin" v-else-if="type === 'warning'"></i>
        <i class="mi icon-cuowu" v-else-if="type === 'error'"></i>
        <i class="mi icon-infofill" v-else></i>
        <p>
            {{ message }}
        </p>
    </aside>
</template>

<script>
export default {
    name: 'BaseMessage',
    data () {
        return {
            type: 'info',
            message: '这是一条消息'
        }
    },
    computed: {
        style () {
            let style = {};

            if ( this.type === 'success' ) {
                style.background = '#e0f7e0';
                style.color = '#33b833';
            } else if ( this.type === 'warning' ) {
                style.background = '#fcf4ea';
                style.color = '#e6a23c';
            } else if ( this.type === 'error' ) {
                style.background = '#fef0f0';
                style.color = '#f56c6c';
            } else {
                style.background = '#f8f5f5';
                style.color = '#aaadb4';
            }

            return style;
        }
    }
}
</script>

<style lang="scss" scoped>

.base-message {
    position: fixed;
    top: 10vh;
    width: 300px;
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-radius: 3px;
    z-index: 99;

    > i {
        margin-right: 5px;
    }
}

</style>