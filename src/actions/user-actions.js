import * as types from '../actions/action-types';

export function getUserSuccess(user) {

    return {
        type : types.GET_USER_SUCCESS,
        user
    };
}

export function showPasswordModal() {
    
    return {
        type : types.PASSWORD_MODAL_SHOW
    }
}

export function hidePasswordModal() {
    
    return {
        type : types.PASSWORD_MODAL_HIDE
    }
}