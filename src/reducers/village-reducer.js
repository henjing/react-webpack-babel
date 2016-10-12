import * as types from '../actions/action-types';

const initialState = {
    info : [],
    status : 0
};

const villageReducer = function (state = initialState, action) {

    switch (action.type) {

        case types.GET_VILLAGE_SUCCESS:
            return Object.assign({}, state, {...action.info})
    }
    
    return state;
};

export default villageReducer;