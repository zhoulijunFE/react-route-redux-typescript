import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

function RegisterRoute(onLoad: any) {
    return (
        <Route path="/register"
            getComponent={(location: any, callback: any) => {
                require.ensure([], function (require: any) {
                    const Index = require('./index')['default'];
                    onLoad(Index.locale, Index.reducer);
                    callback(null, Index.Register);
                }, 'register');
            }}
            getChildRoutes={(location: any, callback: any) => {
                require.ensure([], function (require: any) {
                    const Index = require('./index')['default'];
                    callback(null, Index.RegisterRoutes);
                }, 'register');
            }}>
        </Route>
    );
}

export default RegisterRoute;