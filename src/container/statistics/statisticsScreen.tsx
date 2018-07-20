import React, {
  Component
} from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenOptions } from "react-navigation";
import { Dispatch, Action } from "redux";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
};
class StatisticsScreen extends Component<Props> {
  static navigationOptions: NavigationScreenOptions = {
    title: "Statistics",
  };

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Statistics!</Text>
        <Icon name="done" size={30} color="#900" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

const mapStateToProps = (state: any) => {
  return {
  };
};

export default connect(
  mapStateToProps,
)(StatisticsScreen);