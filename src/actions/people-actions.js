import * as types from './action-types';

export function getPeopleSuccess(info) {

    return {
        type : types.GET_PEOPLE_SUCCESS,
        info
    }
}

export function getVillageSuccess(info) {
    return {
        type : types.GET_VILLAGE_SUCCESS,
        info
    }
}

export function peopleFormAdd(info) {
    return {
        type : types.PEOPLE_FORM_ADD,
        info
    }
}

export function peopleFormEdit(info) {
    return {
        type : types.PEOPLE_FORM_EDIT,
        info
    }
}

export function updatePeopleSearch(info) {
    return {
        type : types.UPDATE_PEOPLE_SEARCH_STATE,
        info
    }
}

export function resetPeopleSearch() {
    return {
        type : types.RESET_PEOPLE_SEARCH_STATE
    }
}

export function getPeopleReset() {
    return {
        type : types.GET_PEOPLE_RESET
    }
}