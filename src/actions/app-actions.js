import * as types from './action-types';

export function updateAppInteractionState(info) {

    return {
        type : types.UPDATE_APP_INTERACTION_STATE,
        info
    }
}