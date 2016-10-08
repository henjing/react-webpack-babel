import * as types from '../actions/action-types';

const initialState = {
    visible : false
};

const modifyPasswordReducer = function (state = initialState, action) {
    
    switch (action.type) {
        
        case types.PASSWORD_MODAL_SHOW : 
            return Object.assign({}, state, { visible : true });
        
        case types.PASSWORD_MODAL_HIDE : 
            return Object.assign({}, state, { visible : false });
    }
    
    return state;
};

export default modifyPasswordReducer;

