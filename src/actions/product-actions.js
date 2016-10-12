import * as types from './action-types';

export function getProductSuccess(info) {
    return {
        type : types.GET_PRODUCT_SUCCESS,
        info
    }
}

export function productModal(info) {
    return {
        type : types.PRODUCT_MODAL,
        info
    }
}

export function getProductReset() {
    return {
        type : types.GET_PRODUCT_RESET
    }
}