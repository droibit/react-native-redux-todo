import React, {
  Component
} from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenOptions } from "react-navigation";
import { Container, Content, Icon } from "native-base";
import { TaskStateProps } from "../../module/state/type";
import { countCompletedTask, countActiveTask } from "../../module/state/task/selector";

type Props = {
  activeTaskCount: number;
  completedTaskCount: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

class StatisticsScreen extends Component<Props> {
  static navigationOptions: NavigationScreenOptions = {
    title: "Statistics",
  };

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { activeTaskCount, completedTaskCount } = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <View style={styles.item}>
            <Icon name="schedule" type="MaterialIcons" />
            <Text style={styles.label}>{"Active TO-DOs: " + activeTaskCount}</Text>
          </View>
          <View style={styles.item}>
            <Icon name="done" type="MaterialIcons" />
            <Text style={styles.label}>{"Completed TO-DOs: " + completedTaskCount}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: TaskStateProps): Partial<Props> => {
  return {
    activeTaskCount: countActiveTask(state),
    completedTaskCount: countCompletedTask(state),
  };
};

export default connect(
  mapStateToProps,
)(StatisticsScreen);