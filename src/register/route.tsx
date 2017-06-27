import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

const route =
  (<Route path="register"
    getComponent={(location:any, callback:any) => {
      require.ensure([], function (require: any) {
        const Index = require('./index')['default'];
        callback(null, Index.App);
      }, 'register');
    }}
    getChildRoutes={(location:any, callback: any) => {
      require.ensure([], function (require:any) {
        const Index = require('./index')['default'];
        callback(null, Index.routes);
      }, 'register');
    }}>
  </Route>);

export default route;