import { combineReducers } from 'redux';

// Reducers
import mainLayoutReducer from './main-layout-reducer';
import navbarLayoutReducer from './navbar-layout-reducer';
import collapseReducer from './collapse-reducer';
import peopleReducer from './people-reducer';
import villageReducer from './village-reducer';
import peopleFormReducer from './people-form-reducer';
import peopleSearchReducer from './people-search-reducer';
import modifyPasswordReducer from './modifyPassword-reducer';
import productListReducer from './product-list-reducer';
import enrollReducer from './enroll-reducer';
import printerReducer from './printer-reducer';

var reducers = combineReducers({
    mainLayoutState : mainLayoutReducer,
    navbarLayoutState : navbarLayoutReducer,
    collapseState : collapseReducer,
    peopleState : peopleReducer,
    villageState : villageReducer,
    peopleFormState : peopleFormReducer,
    peopleSearchState : peopleSearchReducer,
    modifyPasswordState : modifyPasswordReducer,
    productListState : productListReducer,
    enrollState : enrollReducer,
    printerState : printerReducer
});

export default reducers;