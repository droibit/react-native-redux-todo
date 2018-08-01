/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import { Root } from "native-base";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "../module/state";
import { AppNavigator } from "./navigation";

export default class App extends Component {
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
