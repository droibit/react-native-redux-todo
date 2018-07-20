import React, {
  Component
} from "react";
import { View } from "react-native";
import { store, configurePersistStore } from "../../module/state";
import { NavigationScreenProp } from "react-navigation";
import { SCREEN_MAIN } from "../navigation";

type Props = {
  navigation: NavigationScreenProp<any>,
};
export default class Bootstrap extends Component<Props> {

  constructor(props: Props) {
    super(props);
    console.log("Bootstrap.")
    configurePersistStore(store, this.onPersitBootstrapped.bind(this));
  }

  private onPersitBootstrapped() {
    console.log("Bootstrapped.");
    this.props.navigation.navigate(SCREEN_MAIN);
  }

  public render() {
    return null;
  }
}

