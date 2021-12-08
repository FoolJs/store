import axios from 'axios';
import Message from '../components/BaseMessage/index.js';
import tokenStore from '../store/token';


axios.defaults.baseURL = process.env.VUE_APP_REQUEST_URL;
axios.defaults.timeout = 10000;


const http = axios.create();


http.interceptors.request.use(
    config => {

        if ( config.method === 'post' ) {
            const token = tokenStore.state.token;

            if (token) {
                config.headers[ 'Authorization' ] = token;
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export { http };