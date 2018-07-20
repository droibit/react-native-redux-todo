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
class TaskListScreen extends Component<Props> {
  static navigationOptions: NavigationScreenOptions = {
    title: "TO-DOs",
  };

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TASKS!!!!</Text>
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListScreen);