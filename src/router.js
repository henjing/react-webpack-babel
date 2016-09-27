import React from 'react';
import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router';
import PeopleContainer from './components/containers/people-container';

// Layouts
import MainLayout from './components/layouts/main-layout';


export default (
    <Router history={hashHistory}>
        <Route path="/" component={MainLayout} >
            
            <Route path="/people" component={PeopleContainer}></Route>
            
        </Route>
    </Router>
)