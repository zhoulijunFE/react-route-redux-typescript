import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { fetchRegister } from '../action/action';

class App extends React.Component<any,any> {

  componentWillMount() {
    this.props.dispatch(fetchRegister());
  }

  render() {
    return (<div>registerindex{this.props.children}
      <a href="/mgt/workbench/v1/get_companyinfo" >test http mock</a></div>);
  }
}

const mapStateToProps = (state:any, ownProps:any) => {
  const { register } = state;
  return {
    register
  }
}

export default connect(
  mapStateToProps
)(App);