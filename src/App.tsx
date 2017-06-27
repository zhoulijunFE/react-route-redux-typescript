import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import { IntlProvider, addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import * as enLocaleDate from 'react-intl/locale-data/en';
import * as zhLocaleDate from 'react-intl/locale-data/zh';
addLocaleData([...enLocaleDate, ...zhLocaleDate]);

import Index from './index';
import RegisterRoute from './register/route';
import * as storeUtil from './util/storeUtil';
import zh_CN from './register/locale/zh_CN';
import zh_TW from './register/locale/zh_TW';
import en_US from './register/locale/en_US';

import "./static/style/index.scss"

const locales:any = {
    'zh_CN': zh_CN,
    'zh_TW': zh_TW,
    'en_US': en_US
}
const store = storeUtil.configStore();

export default class App extends React.Component<any, any>  {
    routes() {
        return <Route path='/' component={Index}>
            {RegisterRoute}
        </Route>
    }

    getMessage() {
        // (TODO) 添加lang 、locale参数处理
        return 'zh_CN';
    }

    render() {
        const locale = this.getMessage();
        return (<IntlProvider locale={locale} messages={locales[locale]}>
            <Provider store={store}>
                <Router history={hashHistory} routes={this.routes()}>
                </Router>
            </Provider>
        </IntlProvider>)
    }
}