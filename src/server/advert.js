import { http } from './http';

function getAdvert (data) {
    return http({
        method: 'post',
        url: '/advert',
        data
    });
}

export { getAdvert };
