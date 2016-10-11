import React from 'react';
import { Router, Route, browserHistory, IndexRoute, hashHistory, IndexRedirect } from 'react-router';
import PeopleContainer from './components/containers/people-container';
import ProductContainer from './components/containers/product-container';
import EnrollContainer from './components/containers/enroll-container';
import TestContainer from './components/containers/test-container';

// Layouts
import MainLayout from './components/layouts/main-layout';


export default (
    <Router history={hashHistory}>
        <Route path="/" component={MainLayout} >

            <IndexRedirect to="/people" />
            <Route path="people" component={PeopleContainer}></Route>
            
            <Route path="product" component={ProductContainer}></Route>
            
            <Route path="enroll" component={EnrollContainer}></Route>

            <Route path="printer" component={TestContainer}></Route>
            
        </Route>
    </Router>
)