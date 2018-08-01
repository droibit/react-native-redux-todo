import React, { Component } from "react";
import { NavigationScreenProp } from "react-navigation";
import { Persistor } from "redux-persist";
import { configurePersistStore, store } from "../../module/state";
import { SCREEN_MAIN } from "../navigation";

interface Props {
  navigation: NavigationScreenProp<any>;
}
export default class Bootstrap extends Component<Props> {
  private persistor!: Persistor;

  constructor(props: Props) {
    super(props);
    console.log("Bootstrap.");
  }

  public componentDidMount() {
    this.persistor = configurePersistStore(
      store,
      this.onPersistBootstrapped.bind(this),
    );
  }

  private async onPersistBootstrapped() {
    console.log("Bootstrapped.");
    // await this.persistor.purge();
    this.props.navigation.navigate(SCREEN_MAIN);
  }

  public render() {
    return null;
  }
}
