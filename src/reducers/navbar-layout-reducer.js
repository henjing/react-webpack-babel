import * as types from '../actions/action-types';

const initialState = {
    super : '',
    user_name : '',
    wechat_avatar : ''
};

const navbarLayoutReducer = function (state = initialState, action) {

    switch (action.type) {

        case types.GET_USER_SUCCESS:
            return Object.assign({}, state, {...action.user});
    }

    return state;
};



export default navbarLayoutReducer;