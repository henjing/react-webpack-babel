import * as types from '../actions/action-types';

const initialState = {
    currentPage : 1,
    info : [],
    totalPage : 1,
    totalRows : 10,
};

const peopleReducer = function (state = initialState, action) {

    switch (action.type) {

        case types.GET_PEOPLE_SUCCESS:
            action.info.currentPage = parseInt(action.info.currentPage);
            return Object.assign({}, state, {...action.info});

        case types.GET_PEOPLE_RESET :
            return Object.assign({}, {...initialState});
    }

    return state;
};

export default peopleReducer;