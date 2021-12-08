

export default {
    state: {
        pattern: '登录',
        isShow: false
    },
    mutations: {
        changePattern (state, value) {
            state.pattern = value;
        },
        openShow (state) {
            state.isShow = true;
        },
        closeShow (state) {
            state.isShow = false;
        }
    }
}