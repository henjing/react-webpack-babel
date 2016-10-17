import React from 'react';
import { Router, Route, browserHistory, IndexRoute, hashHistory, IndexRedirect } from 'react-router';
import PeopleContainer from './components/containers/people-container';
import ProductContainer from './components/containers/product-container';
import EnrollContainer from './components/containers/enroll-container';
import PrinterContainer from './components/containers/printer-container';

// Layouts
import MainLayout from './components/layouts/main-layout';
// Route base
import { routeBase } from './appConstants/urlConfig';


export default (
    <Router history={browserHistory}>
        <Route path={routeBase} component={MainLayout} >

            <IndexRedirect to={routeBase + 'people'} />
            <Route path={routeBase + 'people'} component={PeopleContainer}></Route>
           
            <Route path={routeBase + 'product'} component={ProductContainer}></Route>
           
            <Route path={routeBase + 'enroll'} component={EnrollContainer}></Route>

            <Route path={routeBase + 'printer'} component={PrinterContainer}></Route>
            
        </Route>
    </Router>
)
