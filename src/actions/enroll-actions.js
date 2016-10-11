import * as types from './action-types';

export function getEnrollSuccess(info) {
    return {
        type : types.GET_ENROLL_SUCCESS,
        info
    }
}

export function getPeopleForEnrollSuccess(info) {
    return {
        type : types.GET_PEOPLE_FOR_ENROLL_SUCCESS,
        info
    }
}

export function enrollModal(info) {
    return {
        type : types.ENROLL_MODAL,
        info
    }
}