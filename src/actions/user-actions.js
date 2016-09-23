import * as types from '../actions/action-types';

export function getUserSuccess(user) {
    console.log('arguments', user);
    console.log('user', {
        type : types.GET_USER_SUCCESS,
        user
    });
    return {
        type : types.GET_USER_SUCCESS,
        user
    };
}

