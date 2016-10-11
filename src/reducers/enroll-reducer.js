import * as types from '../actions/action-types';

const initialState = {
    enrollOrder : {
        info : [{}],
        currentPage : 1,
        totalPage : 1,
        totalRows : 1
    },
    enrollPeople : [{}],
    modalVisible : false
};

const enrollReducer = function (state = initialState, action) {
    
    switch (action.type) {

        case types.GET_ENROLL_SUCCESS :
            return Object.assign({}, state, { enrollOrder: action.info });

        case types.GET_PEOPLE_FOR_ENROLL_SUCCESS :
            return Object.assign({}, state, { enrollPeople : action.info});

        case types.ENROLL_MODAL :
            return Object.assign({}, state, { modalVisible : action.info.visible});
    }
    
    return state;
};

export default enrollReducer;