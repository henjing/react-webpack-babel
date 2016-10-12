import * as types from '../actions/action-types';

const initialState = {
    dateStart : '',
    dateEnd : '',
    search : '',
    timeLimit : '',
    page : '',
    village_info_id : '',
    isReset : false
};

const peopleSearchReducer = function (state = initialState, action) {

    switch (action.type) {

        case types.UPDATE_PEOPLE_SEARCH_STATE :
            return Object.assign({}, state, {...action.info}, {isReset : false});

        case types.RESET_PEOPLE_SEARCH_STATE :
            return Object.assign({}, initialState, {isReset : true});
    }

    return state;
};

export default peopleSearchReducer;
