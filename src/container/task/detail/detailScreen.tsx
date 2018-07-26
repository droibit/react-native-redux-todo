import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Action } from "redux";
import { connect } from "react-redux";
import {
  NavigationScreenOptions,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import {
  Icon,
  CheckBox,
  Fab,
} from 'native-base';
import moment from 'moment';
import { Task } from "../../../module/model/task";
import { TaskStateProps } from "../../../module/state/type";
import { Container } from "native-base";
import { ReduxThunkDispatch } from "../../../module/state/reduxActionType";
import * as Actions from "../../../module/state/task/action";
import { SCREEN_TASK_UPDATE } from "../../navigation";
import { NavigationParams as UpdateNavigationParams } from "../edit/updateTaskScreen";

export type NavigationParams = {
  taskId: string;
}

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
  task: Task;

  completeTask(taskId: string): void;
  activeTask(taskId: string): void;
};

const EMPTY_DESCRIPTION = "---";

const itemStyle: StyleProp<ViewStyle> = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "white",
  paddingLeft: 16,
  paddingRight: 16,
};
const textStyle: StyleProp<TextStyle> = {
  fontSize: 20,
  flex: 1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleItem: {
    ...itemStyle,
    height: 64,
  },
  descriptionItem: {
    ...itemStyle,
    minHeight: 64,
  },
  timestampItem: {
    ...itemStyle,
    height: 64,
  },
  leftIcon: {
    marginRight: 16,
  },
  title: {
    ...textStyle,
    color: "black",
  },
  description: {
    ...textStyle,
    alignItems: "baseline",
  },
  completeCheckBox: {
    marginRight: 16,
  },
  timestamp: {
    ...textStyle,
  },
});

class TaskDetailScreen extends Component<Props> {

  static navigationOptions: NavigationScreenOptions = {
    title: "TO-DO",
  };

  public render() {
    const { task } = this.props;
    return (
      <Container>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.titleItem}>
            <Icon
              name="title"
              type="MaterialIcons"
              fontSize={24}
              style={styles.leftIcon}
            />
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.title}>
              {task.title}
            </Text>
            <CheckBox
              checked={task.completed}
              onPress={this.onCompletedCheckBoxPress.bind(this)}
              style={styles.completeCheckBox}
            />
          </View>
          <View style={styles.descriptionItem}>
            <Icon
              name="description"
              type="MaterialIcons"
              fontSize={24}
              style={styles.leftIcon}
            />
            <Text
              style={styles.description}>
              {(task.description !== "") ? task.description : EMPTY_DESCRIPTION}
            </Text>
          </View>
          <View style={styles.timestampItem}>
            <Icon
              name="calendar"
              type="MaterialCommunityIcons"
              fontSize={24}
              style={styles.leftIcon}
            />
            <Text
              numberOfLines={1}
              style={styles.timestamp}>
              {moment(task.timestamp).format("YYYY/MM/DD HH:mm")}
            </Text>
          </View>
        </ScrollView>
        <Fab
          active={true}
          position="bottomRight"
          onPress={this.onEditButtonPress.bind(this)}
        >
          <Icon type="MaterialIcons" name="edit" />
        </Fab>
      </Container>
    );
  }

  private onCompletedCheckBoxPress() {
    console.log("#onCompletedCheckBoxPress()");
    const { task } = this.props;
    if (task.isActive) {
      this.props.completeTask(task.id);
    } else {
      this.props.activeTask(task.id);
    }
  }

  private onEditButtonPress() {
    console.log("#onEditButtonPress()");
    const { task, navigation } = this.props;
    navigation.push(SCREEN_TASK_UPDATE, {
      taskId: task.id,
      taskTitle: task.title,
      taskDescription: task.description,
    } as UpdateNavigationParams);
  }
}

const mapStateToProps = (state: TaskStateProps, props: Props): Partial<Props> => {
  return {
    task: state.task.tasks.getTaskById(props.navigation.getParam("taskId"))!,
  };
};

const mapDispatchToProps = (
  dispatch: ReduxThunkDispatch<Action>
): Partial<Props> => {
  return {
    completeTask: (taskId) => {
      dispatch(Actions.completeTask(taskId));
    },
    activeTask: (taskId) => {
      dispatch(Actions.activeTask(taskId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskDetailScreen);