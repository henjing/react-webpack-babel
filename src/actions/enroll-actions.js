import * as types from './action-types';

export function getEnrollSuccess(info) {
    return {
        type : types.GET_ENROLL_SUCCESS,
        info
    }
}

export function editProductSuccess(info) {
    return {
        type : types.EDIT_PRODUCT_SUCCESS,
        info
    }
}

export function deleteProductSuccess(info) {
    return {
        type : types.DELETE_PRODUCT_SUCCESS,
        info
    }
}

export function addProductSuccess(info) {
    return {
        type : types.ADD_PRODUCT_SUCCESS,
        info
    }
}

export function productModal(info) {
    return {
        type : types.PRODUCT_MODAL,
        info
    }
}