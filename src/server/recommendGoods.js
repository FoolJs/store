import { http } from './http';

function getRecommendGoods(data) {
    return http({
        method: 'post',
        url: '/recommend-goods',
        data,
    });
}

export { getRecommendGoods };
