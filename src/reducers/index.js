import { combineReducers } from 'redux';

// Reducers
import mainLayoutReducer from './main-layout-reducer';
import navbarLayoutReducer from './navbar-layout-reducer';
import collapseReducer from './collapse-reducer';

var reducers = combineReducers({
    mainLayoutState : mainLayoutReducer,
    navbarLayoutState : navbarLayoutReducer,
    collapseState : collapseReducer
});

export default reducers;