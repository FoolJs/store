export default {
    state: {
        messageIsShow: true,
    },
    mutations: {
        closeMessage (state) {
            state.messageIsShow = false;
        }
    },
};
