import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const middleware = [ thunk ];
// if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
// }

const store = createStore(reducers, applyMiddleware(...middleware));
export default store;