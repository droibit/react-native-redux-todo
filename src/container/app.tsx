/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
} from "react";
import { store } from "../module/state";
import { Provider } from "react-redux";
import { AppNavigator } from "./navigation";

type Props = {};
export default class App extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
