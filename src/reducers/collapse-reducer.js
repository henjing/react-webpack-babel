const initialState = {
    collapse : false
};

const collapseReducer = function (state = initialState, action) {
    if (action.type === 'collapse') {
        return {
            collapse: !state.collapse
        }
    }

    return state;
};

export default collapseReducer;