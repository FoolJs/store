import { http } from './http';


function getCommodityType (data) {
    return http({
        method: 'post',
        url: '/get-commodity-type',
        data,
    });
}

function getGoodsDetails (data) {
    return http({
        method: 'post',
        url: '/goods-details',
        data
    });
}


export { getCommodityType, getGoodsDetails };