import * as React from 'react';
import { Route } from 'react-router';

import RegisterInfo from './components/RegisterInfo';

const RegisterRoutes = [
    <Route path="info" component={RegisterInfo}></Route>
];

export default RegisterRoutes;