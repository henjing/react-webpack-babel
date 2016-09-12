import { combineReducers } from 'redux';

// Reducers
import mainLayoutReducer from './main-layout-reducer';

var reducers = combineReducers({
    mainLayoutState : mainLayoutReducer
});

export default reducers;