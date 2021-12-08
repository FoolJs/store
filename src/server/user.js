import { http } from './http';




function getUserNameCart (data) {
    return http({
        method: 'post',
        url: '/get-name-car',
        data
    });
}


function getAddShoppingCart (data) {
    return http({
        method: 'post',
        url: '/add-shopping-car',
        data
    });
}


function requestShoppingCart (data) {
    return http({
        method: 'post',
        url: '/shopping-cart',
        data
    });
}


function updateShoppingCart (data) {
    return http({
        method: 'post',
        url: '/update-shopping-cart',
        data
    });
}


function getAddressList (data) {
    return http({
        method: 'post',
        url: '/address-list',
        data
    });
} 

function addAddressMessage (data) {
    return http({
        method: 'post',
        url: '/add-address',
        data
    });
}

function removeAddressMessage (data) {
    return http({
        method: 'post',
        url: '/remove-address',
        data
    });
}

function placeOrder (data) {
    return http({
        method: 'post',
        url: '/place-order',
        data
    });
}


export {
    getUserNameCart,
    getAddShoppingCart,
    requestShoppingCart,
    updateShoppingCart,
    getAddressList,
    addAddressMessage,
    removeAddressMessage,
    placeOrder,
};