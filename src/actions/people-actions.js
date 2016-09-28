import * as types from './action-types';

export function getPeopleSuccess(info) {

    return {
        type : types.GET_PEOPLE_SUCCESS,
        info
    }
}