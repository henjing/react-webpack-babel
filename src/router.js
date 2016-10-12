import React from 'react';
import { Router, Route, browserHistory, IndexRoute, hashHistory, IndexRedirect } from 'react-router';
import PeopleContainer from './components/containers/people-container';
import ProductContainer from './components/containers/product-container';
import EnrollContainer from './components/containers/enroll-container';
import PrinterContainer from './components/containers/printer-container';

// Layouts
import MainLayout from './components/layouts/main-layout';


export default (
    <Router history={browserHistory}>
        <Route path="/admin/village/index/" component={MainLayout} >

            <IndexRedirect to="/admin/village/index/people" />
            <Route path="/admin/village/index/people" component={PeopleContainer}></Route>
            
            <Route path="/admin/village/index/product" component={ProductContainer}></Route>
            
            <Route path="/admin/village/index/enroll" component={EnrollContainer}></Route>

            <Route path="/admin/village/index/printer" component={PrinterContainer}></Route>
            
        </Route>
    </Router>
)