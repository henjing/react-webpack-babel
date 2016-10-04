import * as types from '../actions/action-types';

const initialState = {
    id : '',
    name : '',
    phone : '',
    identity_no : '',
    profile : '',
    remark : '',
    village_info_id : '',
    head_img : '',
    visible : false,
    type : 'add'   // add or edit
};

const peopleFormReducer = function (state = initialState, action) {

    switch (action.type) {
        
        case types.PEOPLE_FORM_ADD : 
            return Object.assign({}, state, {...action.info});
        
        case types.PEOPLE_FORM_EDIT: 
            return Object.assign({}, state, {...action.info});
    }
    
    return state;
};

export default peopleFormReducer;