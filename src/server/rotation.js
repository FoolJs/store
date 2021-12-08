import { http } from './http';


function getRotation (data) {
    return http({
        method: 'post',
        url: '/rotation',
        data
    });
}

export { getRotation };
