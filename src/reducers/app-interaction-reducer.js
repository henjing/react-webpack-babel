import * as types from '../actions/action-types';

const initialState = {
    provinces : {
        info : []
    },
    villages : {
        info : [],
        current_page : 1,
        totalPage : 1,
        totalRows : 0
    },
    villageSearch : '',
    villagePageSearch : 1,
    cashierModalVisible : false,
    cashierRefreshCount : 0
};

const appInteractionReducer = function (state = initialState, action) {

    switch (action.type) {

        case types.UPDATE_APP_INTERACTION_STATE :
            return Object.assign({}, state, {...action.info});

    }

    return state;
};

export default appInteractionReducer;