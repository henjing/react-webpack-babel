import * as types from '../actions/action-types';

const initialState = {
    info : {
        menu : [],
        super : 0,
        user_name : '',
        wechat_avatar : ''
    },
    status : 0
};

const navbarLayoutReducer = function (state = initialState, action) {

    switch (action.type) {

        case types.GET_USER_SUCCESS:
            return Object.assign({}, state, {...action.info});
    }

    return state;
};



export default navbarLayoutReducer;