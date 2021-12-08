export default {
    state: {
        token: ''
    },
    mutations: {
        setToken (state, token) {
            state.token = token;
            localStorage.setItem( 'token', token );
        },

        deleteToken (state) {
            localStorage.removeItem('token');
            state.token = '';
        }
    },
};
