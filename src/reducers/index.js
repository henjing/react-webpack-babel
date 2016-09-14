import { combineReducers } from 'redux';

// Reducers
import mainLayoutReducer from './main-layout-reducer';
import navbarLayoutReducer from './navbar-layout-reducer';

var reducers = combineReducers({
    mainLayoutState : mainLayoutReducer,
    navbarLayoutState : navbarLayoutReducer
});

export default reducers;