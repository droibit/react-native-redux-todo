import React, { Component } from "react";
import { connect } from "react-redux";
import {
  NavigationScreenOptions,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { Action } from "redux";
import { Container, Toast, Content, Fab } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import Loading from "./loading";
import EmptyView from "./emptyView";
import TaskList from "./taskList";
import {
  TaskStateProps,
  AppSettingsStateProps
} from "../../../module/state/type";
import { filteredAndSortedTasks } from "../../../module/state/task/selector";
import { Task } from "../../../module/model/task";
import * as TaskActions from "../../../module/state/task/action";
import * as SettingsActions from "../../../module/state/settings/action";
import { ReduxThunkDispatch } from "../../../module/state/reduxActionType";
import { SCREEN_TASK_NEW, SCREEN_TASK_FILTER_CHOOSER } from "../../navigation";
import { Result } from "../../../module/model/result";
import { TaskSortSetting, TaskVisibilityFilter, TaskSortByOrder } from "../../../module/model/settings";
import TaskListHeader from "./taskListHeader";

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
  loading: boolean;
  tasks: ReadonlyArray<Task>;
  taskSortSetting: TaskSortSetting;
  taskVisibilityFilter: TaskVisibilityFilter;
  createTaskResult: Result<Task>;
  completeTaskResult: Result<Task>;
  activeTaskResult: Result<Task>;
  deleteTaskResult: Result<string>;

  getTasks(): void;
  completeTask(taskId: string): void;
  activeTask(taskId: string): void;
  deleteTask(taskId: string): void;
  updateTaskSortOrder(order: TaskSortByOrder): void;
};

type State = {
  loading: boolean;
  mounted: boolean;
};

class TaskListScreen extends Component<Props, State> {
  static navigationOptions: NavigationScreenOptions = {
    title: "TO-DO",
    // ref. https://github.com/react-navigation/react-navigation/issues/790#issuecomment-310332665
    headerStyle: {
      elevation: 0, //remove shadow on Android
      shadowOpacity: 0, //remove shadow on iOS
    },
  };

  static getDerivedStateFromProps(
    nextProps: Readonly<Props>,
    prevState: State
  ): Partial<State> | null {
    console.log(
      `#getDerivedStateFromProps(nextProps${JSON.stringify(
        nextProps
      )}, prevState=${JSON.stringify(prevState)})`
    );

    if (!prevState.mounted) {
      return { mounted: true };
    }
    if (prevState.loading !== nextProps.loading) {
      return {
        loading: nextProps.loading,
      };
    }
    return null;
  }

  constructor(props: Props) {
    super(props);
    console.log(`TaskListScreen.props: ${JSON.stringify(props)}`);
    this.state = {
      loading: true,
      mounted: false,
    };
  }

  public componentDidMount() {
    this.props.getTasks();
    console.log("Dispatch get tasks action.");
  }

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    // console.log(`#componentDidUpdate(
    //   prevProps=${JSON.stringify(prevProps)},
    //   props=${JSON.stringify(this.props)},
    // )`);
    const { createTaskResult, completeTaskResult, activeTaskResult } = this.props;
    if (createTaskResult !== prevProps.createTaskResult && createTaskResult.isSuccess) {
      Toast.show({
        text: "TO-DO created.",
        type: "success",
      });
    }

    if (completeTaskResult !== prevProps.completeTaskResult && completeTaskResult.isError) {
      Toast.show({
        text: "Failed to complete TO-DO.",
        type: "danger",
      });
    }

    if (activeTaskResult !== prevProps.activeTaskResult && activeTaskResult.isError) {
      Toast.show({
        text: "Failed to active TO-DO.",
        type: "danger",
      });
    }
  }

  public render() {
    console.log(`TaskListScreen.render(state=${JSON.stringify(this.state)})`);
    const { loading } = this.state;
    if (loading) {
      return (
        <Container>
          <Loading label="Loading..." />
        </Container>
      );
    }

    // const { tasks, taskVisibleFilter, taskSortSetting, } = this.props;
    let content: JSX.Element;
    if (this.props.tasks.length > 0) {
      content = <TaskList
        {...this.props}
        onItemPress={this.onTaskItemPress.bind(this)}
        onCompleteChecBoxPress={this.onTaskCompleteCheckBoxPress.bind(this)}
        onItemDeletePress={this.onDeleteButtonPress.bind(this)}
      />
    } else {
      content = <EmptyView text="No TO-DOs." />;
    }

    return (
      <Container>
        <TaskListHeader
          {...this.props}
          onFilterPress={this.onFilterButtonPress.bind(this)}
          onSortPress={this.onSortButtonPress.bind(this)}
        />
      <Content contentContainerStyle={{ flex: 1 }}>
        {content}
        </Content>
        <Fab
          active={true}
          position="bottomRight"
          onPress={this.onAddButtonPress.bind(this)}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }

  private onTaskItemPress(task: Task) {
    console.log(`#onTaskItemPress(task=${JSON.stringify(task)})`);
  }

  private onTaskCompleteCheckBoxPress(task: Task) {
    console.log(`#onTaskCompleteCheckBoxPress(task=${JSON.stringify(task)})`);
    if (task.isActive) {
      this.props.completeTask(task.id);
    } else {
      this.props.activeTask(task.id);
    }
  }

  private onAddButtonPress() {
    console.log("#onAddButtonPress()");
    this.props.navigation.navigate(SCREEN_TASK_NEW)
  }

  private onDeleteButtonPress(task: Task) {
    console.log("#onDeleteButtonPress()")
    this.props.deleteTask(task.id);
  }

  private onFilterButtonPress() {
    console.log("#onFilterButtonPress()");
    this.props.navigation.navigate(SCREEN_TASK_FILTER_CHOOSER);
  }

  private onSortButtonPress() {
    console.log("#onSortButtonPress()");
    this.props.updateTaskSortOrder(
      this.props.taskSortSetting.taskSortByOrder == TaskSortByOrder.ASC
        ? TaskSortByOrder.DESC : TaskSortByOrder.ASC
    )
  }
}

const mapStateToProps = (
  state: TaskStateProps & AppSettingsStateProps
): Partial<Props> => {
  // console.log(`mapStateToProps: ${JSON.stringify(state)}`);
  return {
    tasks: filteredAndSortedTasks(state),
    taskSortSetting: state.appSettings.taskSortSetting,
    taskVisibilityFilter: state.appSettings.taskVisibilityFilter,
    loading: state.task.loadingResult.inProgress,
    createTaskResult: state.task.createResult,
    completeTaskResult: state.task.completeResult,
    activeTaskResult: state.task.activeResult,
    deleteTaskResult: state.task.deleteResult,
  };
};

const mapDispatchToProps = (
  dispatch: ReduxThunkDispatch<Action>
): Partial<Props> => {
  return {
    getTasks: () => {
      dispatch(TaskActions.getTasks());
    },
    completeTask: (taskId) => {
      dispatch(TaskActions.completeTask(taskId));
    },
    activeTask: (taskId) => {
      dispatch(TaskActions.activeTask(taskId));
    },
    deleteTask: (taskId) => {
      dispatch(TaskActions.deleteTask(taskId));
    },
    updateTaskSortOrder: (order) => {
      dispatch(SettingsActions.updateTaskSortByOrder(order));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListScreen);
