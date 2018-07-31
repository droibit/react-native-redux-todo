/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { store } from '../module/state';
import { Provider } from 'react-redux';
import { AppNavigator } from './navigation';
import { Root } from 'native-base';

type Props = {};
export default class App extends Component<Props> {
  public render() {
    return (
      <Provider store={store}>
        <Root>
          <AppNavigator />
        </Root>
      </Provider>
    );
  }
}
