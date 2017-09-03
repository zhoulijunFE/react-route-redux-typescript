import * as React from 'react';
import * as  ReactDOM from 'react-dom';

import Register from './views/Register';
import locale from './locale';
import RegisterRoutes from './RegisterRoutes';
import * as reducer from './reducers/index';

const Index = {
    locale,
    reducer,
    Register,
    RegisterRoutes
}
export default Index;