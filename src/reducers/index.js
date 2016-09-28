import { combineReducers } from 'redux';

// Reducers
import mainLayoutReducer from './main-layout-reducer';
import navbarLayoutReducer from './navbar-layout-reducer';
import collapseReducer from './collapse-reducer';
import peopleReducer from './people-reducer';

var reducers = combineReducers({
    mainLayoutState : mainLayoutReducer,
    navbarLayoutState : navbarLayoutReducer,
    collapseState : collapseReducer,
    peopleState : peopleReducer
});

export default reducers;