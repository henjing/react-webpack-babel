import * as types from '../actions/action-types';

const initialState = {
    collapse : false
};

const collapseReducer = function (state = initialState, action) {
    if (action.type === types.COLLAPSE) {
        return {
            collapse: !state.collapse
        }
    }

    return state;
};

export default collapseReducer;