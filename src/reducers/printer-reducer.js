import * as types from '../actions/action-types';

const initialState = {
    info : []
};

const printerListReducer = function (state = initialState, action) {
    
    switch (action.type) {
        
        case types.GET_PRINTER_LIST_SUCCESS :
            return Object.assign({}, state, {...action.info});
    }
    
    return state;
};

export default printerListReducer;