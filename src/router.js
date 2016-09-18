import React from 'react';
import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';


export default (
    <Router history={hashHistory}>
        <Route path="/" component={MainLayout} />
            
        
    </Router>
)