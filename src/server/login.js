import { http } from './http';



// 请求验证码
function getCode (data) {
    return http({
        method: 'post',
        url: '/get-code',
        data
    });
}


function register (data) {
    return http({
        method: 'post',
        url: '/register',
        data
    });
}

function login (data) {
    return http({
        method: 'post',
        url: '/login',
        data
    });
}


export {
    getCode,
    register,
    login
};