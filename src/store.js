import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const middleware = [ thunk ];

const store = createStore(reducers, applyMiddleware(...middleware));
export default store;