import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class Index extends React.Component<any, any> {
   render() {
       return <div>index{this.props.children}</div>;
   }
}