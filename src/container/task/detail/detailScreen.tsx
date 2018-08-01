import moment from "moment";
import { CheckBox, Fab, Icon } from "native-base";
import { Container } from "native-base";
import React, { Component } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  NavigationActions,
  NavigationRoute,
  NavigationScreenOptions,
  NavigationScreenProp,
} from "react-navigation";
import { connect } from "react-redux";
import I18n from "../../../i18n";
import { Task } from "../../../module/model/task";
import { ReduxThunkDispatch } from "../../../module/state/reduxActionType";
import { TaskStateProps } from "../../../module/state/stateType";
import * as Actions from "../../../module/state/task/actionCreator";
import { SCREEN_TASK_UPDATE } from "../../navigation";
import { NavigationParams as UpdateNavigationParams } from "../edit/updateTaskScreen";

export interface NavigationParams {
  taskId: string;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
  task: Task;

  completeTask(taskId: string): void;
  activeTask(taskId: string): void;
}

const EMPTY_DESCRIPTION = "---";

const itemStyle: StyleProp<ViewStyle> = {
  alignItems: "center",
  backgroundColor: "white",
  flexDirection: "row",
  paddingLeft: 16,
  paddingRight: 16,
};
const textStyle: StyleProp<TextStyle> = {
  flex: 1,
  fontSize: 20,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  // noinspection JSUnusedGlobalSymbols
  public static navigationOptions: NavigationScreenOptions = {
    title: I18n.t("title"),
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
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
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
            <Text style={styles.description}>
              {task.description !== "" ? task.description : EMPTY_DESCRIPTION}
            </Text>
          </View>
          <View style={styles.timestampItem}>
            <Icon
              name="calendar"
              type="MaterialCommunityIcons"
              fontSize={24}
              style={styles.leftIcon}
            />
            <Text numberOfLines={1} style={styles.timestamp}>
              {moment(task.timestamp).format("YYYY/MM/DD HH:mm")}
            </Text>
          </View>
        </ScrollView>
        <Fab
          active={true}
          position="bottomRight"
          onPress={this.onEditButtonPress.bind(this)}>
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
    navigation.navigate(
      SCREEN_TASK_UPDATE,
      {},
      NavigationActions.navigate({
        params: {
          taskDescription: task.description,
          taskId: task.id,
          taskTitle: task.title,
        } as UpdateNavigationParams,
        routeName: SCREEN_TASK_UPDATE,
      }),
    );
  }
}

const mapStateToProps = (
  state: TaskStateProps,
  props: Props,
): Partial<Props> => {
  return {
    task: state.task.tasks.getTaskById(props.navigation.getParam("taskId"))!,
  };
};

const mapDispatchToProps = (dispatch: ReduxThunkDispatch): Partial<Props> => {
  return {
    activeTask: taskId => {
      dispatch(Actions.activeTask(taskId));
    },
    completeTask: taskId => {
      dispatch(Actions.completeTask(taskId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(TaskDetailScreen);
