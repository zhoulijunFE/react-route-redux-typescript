import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

import { IntlProvider, addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import * as enLocaleDate from 'react-intl/locale-data/en';
import * as zhLocaleDate from 'react-intl/locale-data/zh';
addLocaleData([...enLocaleDate, ...zhLocaleDate]);

import RegisterRoute from './register/RegisterRoute';
import * as storeUtil from './util/storeUtil';
import { locale } from './util/i18nUtil';

const store = storeUtil.configStore();

export default class App extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            locales: {
                'zh-CN': {},
                'zh-TW': {},
                'en-US': {}
            }
        }
        this.onRouteLoad = this.onRouteLoad.bind(this);
    }

    private routes() {
        return (
            <Route path='/'>
                <IndexRedirect to='register' />
                {RegisterRoute(this.onRouteLoad)}
            </Route>
        )
    }

    private onRouteLoad(routeLocale: any, routeReducer: any): void {
        // (NOTE)zhoulj 动态路由国际化资源、reduer内存加载
        routeLocale && this.mergeLocale(routeLocale);
        routeReducer && this.mergeReducer(routeReducer);
    }

    private mergeLocale(routeLocale: any) {
        const locales = this.state.locales;
        this.setState({
            locales: {
                'zh-CN': Object.assign({}, locales['zh-CN'], routeLocale.zh_CN),
                'zh-TW': Object.assign({}, locales['zh-CN'], routeLocale.zh_CN),
                'en-US': Object.assign({}, locales['en-US'], routeLocale.en_US)
            }
        })
    }

    private mergeReducer(routeReducer: any) {
        storeUtil.mergeStoreReducer(routeReducer);
    }

    public render() {
        let { locales } = this.state;
        return (
            <IntlProvider locale={locale} messages={this.state.locales[locale]}>
                <Provider store={store}>
                    <Router
                        history={hashHistory}
                        routes={this.routes()}>
                    </Router>
                </Provider>
            </IntlProvider>
        )
    }
}