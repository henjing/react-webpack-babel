import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';


export default (
    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>

        </Route>
    </Router>
)