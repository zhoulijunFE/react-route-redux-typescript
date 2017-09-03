import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Header from '../../common/components/Header';
import Footer from '../../common/components/Footer';

class Register extends React.Component<{}, {}> {
    public render() {
        return (
          <div>
            <Header />
            register body
            <Footer />
          </div>
        );
    }
}

export default Register;