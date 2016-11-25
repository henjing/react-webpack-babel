import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'antd/dist/antd.less';
import 'bootstrap/less/bootstrap.less';
import './app.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';

// 外部组件的css
import '../outside-components/style/components/less.less';

// Provider is a top-level component that wrapps our entire application, including
// the Router. We pass it a reference to the store so we can use react-redux's
// connect() method for Component Containers.
ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('app')
);
