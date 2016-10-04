import { combineReducers } from 'redux';

// Reducers
import mainLayoutReducer from './main-layout-reducer';
import navbarLayoutReducer from './navbar-layout-reducer';
import collapseReducer from './collapse-reducer';
import peopleReducer from './people-reducer';
import villageReducer from './village-reducer';
import peopleFormReducer from './people-form-reducer';
import peopleSearchReducer from './people-search-reducer';

var reducers = combineReducers({
    mainLayoutState : mainLayoutReducer,
    navbarLayoutState : navbarLayoutReducer,
    collapseState : collapseReducer,
    peopleState : peopleReducer,
    villageState : villageReducer,
    peopleFormState : peopleFormReducer,
    peopleSearchState : peopleSearchReducer
});

export default reducers;