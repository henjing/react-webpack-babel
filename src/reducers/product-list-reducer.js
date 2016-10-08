import * as types from '../actions/action-types';

const initialState = {
    info : [{}],
    visible : false,
    type : 'add', // or 'edit'
    formState : {},
};

const productListReducer = function (state = initialState, action) {
    
    switch (action.type) {
        
        case types.GET_PRODUCT_SUCCESS:
            return Object.assign({}, state, { info : action.info});
        
        case types.PRODUCT_MODAL:
            return Object.assign({}, state, {...action.info})
        
    }
    
    return state;
};

export default productListReducer;