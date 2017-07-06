import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';

export default class DemoRedux2 extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('DemoRedux2', () => DemoRedux2);
