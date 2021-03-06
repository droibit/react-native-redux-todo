import { Container, Content, Fab, Toast } from "native-base";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  NavigationRoute,
  NavigationScreenConfig,
  NavigationScreenOptions,
  NavigationScreenProp,
} from "react-navigation";
import { connect } from "react-redux";
import I18n from "../../../i18n";
import { Result } from "../../../module/model/result";
import {
  TaskSortByOrder,
  TaskSortSetting,
  TaskVisibilityFilter,
} from "../../../module/model/settings";
import { Task } from "../../../module/model/task";
import { ReduxThunkDispatch } from "../../../module/state/reduxActionType";
import * as SettingsActions from "../../../module/state/settings/actionCreator";
import {
  AppSettingsStateProps,
  TaskStateProps,
} from "../../../module/state/stateType";
import * as TaskActions from "../../../module/state/task/actionCreator";
import { filteredAndSortedTasks } from "../../../module/state/task/selector";
import {
  SCREEN_SETTINGS,
  SCREEN_TASK_DETAIL,
  SCREEN_TASK_FILTER_CHOOSER,
  SCREEN_TASK_NEW,
} from "../../navigation";
import { SettingsHeaderButton } from "../../shared/headerItem";
import { NavigationParams as DetailNavigationParams } from "../detail/detailScreen";
import EmptyView from "./emptyView";
import Loading from "./loading";
import TaskList from "./taskList";
import TaskListHeader from "./taskListHeader";

interface NavigationParams {
  onSettingsHeaderButtonPress(): void;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
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
}

interface State {
  loading: boolean;
  mounted: boolean;
}

class TaskListScreen extends Component<Props, State> {
  // noinspection JSUnusedGlobalSymbols
  public static navigationOptions: NavigationScreenConfig<
    NavigationScreenOptions
  > = ({ navigation }) => {
    return {
      title: I18n.t("title"),
      // ref. https://github.com/react-navigation/react-navigation/issues/790#issuecomment-310332665
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerRight: (
        <SettingsHeaderButton
          onPress={navigation.getParam("onSettingsHeaderButtonPress")}
        />
      ),
    };
  };

  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>,
    prevState: State,
  ): Partial<State> | null {
    // console.log(
    //   `#getDerivedStateFromProps(nextProps${JSON.stringify(
    //     nextProps
    //   )}, prevState=${JSON.stringify(prevState)})`
    // );

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
    this.props.navigation.setParams({
      onSettingsHeaderButtonPress: this.onSettingsHeaderButtonPress.bind(this),
    });
  }

  public componentDidMount() {
    this.props.getTasks();
    console.log("Dispatch get tasks action.");
  }

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ) {
    // console.log(`#componentDidUpdate(
    //   prevProps=${JSON.stringify(prevProps)},
    //   props=${JSON.stringify(this.props)},
    // )`);
    const {
      createTaskResult,
      completeTaskResult,
      activeTaskResult,
    } = this.props;
    if (
      createTaskResult !== prevProps.createTaskResult &&
      createTaskResult.isSuccess
    ) {
      Toast.show({
        text: I18n.t("newTaskSuccessfulToCreate"),
        type: "success",
      });
    }

    if (
      completeTaskResult !== prevProps.completeTaskResult &&
      completeTaskResult.isError
    ) {
      Toast.show({
        text: I18n.t("newTaskFailedToCreate"),
        type: "danger",
      });
    }

    // if (activeTaskResult !== prevProps.activeTaskResult && activeTaskResult.isError) {
    //   Toast.show({
    //     text: "Failed to active TO-DO.",
    //     type: "danger",
    //   });
    // }
  }

  public render() {
    console.log(`TaskListScreen.render(state=${JSON.stringify(this.state)})`);
    const { loading } = this.state;
    if (loading) {
      return (
        <Container>
          <Loading label={I18n.t("todoListLoading")} />
        </Container>
      );
    }

    // const { tasks, taskVisibleFilter, taskSortSetting, } = this.props;
    let content: JSX.Element;
    if (this.props.tasks.length > 0) {
      content = (
        <TaskList
          {...this.props}
          onItemPress={this.onTaskItemPress.bind(this)}
          onCompleteCheckBoxPress={this.onTaskCompleteCheckBoxPress.bind(this)}
          onItemDeletePress={this.onDeleteButtonPress.bind(this)}
        />
      );
    } else {
      content = <EmptyView text={I18n.t("noTasks")} />;
    }

    return (
      <Container>
        <TaskListHeader
          {...this.props}
          onFilterPress={this.onFilterButtonPress.bind(this)}
          onSortPress={this.onSortButtonPress.bind(this)}
        />
        <Content contentContainerStyle={{ flex: 1 }}>{content}</Content>
        <Fab
          active={true}
          position="bottomRight"
          onPress={this.onAddButtonPress.bind(this)}>
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }

  private onTaskItemPress(task: Task) {
    console.log(`#onTaskItemPress(task=${JSON.stringify(task)})`);
    this.props.navigation.push(SCREEN_TASK_DETAIL, {
      taskId: task.id,
    } as DetailNavigationParams);
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
    this.props.navigation.navigate(SCREEN_TASK_NEW);
  }

  private onDeleteButtonPress(task: Task) {
    console.log("#onDeleteButtonPress()");
    this.props.deleteTask(task.id);
  }

  private onFilterButtonPress() {
    console.log("#onFilterButtonPress()");
    this.props.navigation.navigate(SCREEN_TASK_FILTER_CHOOSER);
  }

  private onSortButtonPress() {
    console.log("#onSortButtonPress()");
    this.props.updateTaskSortOrder(
      this.props.taskSortSetting.taskSortByOrder === TaskSortByOrder.ASC
        ? TaskSortByOrder.DESC
        : TaskSortByOrder.ASC,
    );
  }

  private onSettingsHeaderButtonPress() {
    console.log("#onSettingsHeaderButtonPress()");
    this.props.navigation.navigate(SCREEN_SETTINGS);
  }
}

const mapStateToProps = (
  state: TaskStateProps & AppSettingsStateProps,
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

const mapDispatchToProps = (dispatch: ReduxThunkDispatch): Partial<Props> => {
  return {
    getTasks: () => {
      dispatch(TaskActions.getTasks());
    },
    completeTask: taskId => {
      dispatch(TaskActions.completeTask(taskId));
    },
    activeTask: taskId => {
      dispatch(TaskActions.activeTask(taskId));
    },
    deleteTask: taskId => {
      dispatch(TaskActions.deleteTask(taskId));
    },
    updateTaskSortOrder: order => {
      dispatch(SettingsActions.updateTaskSortByOrder(order));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(TaskListScreen);
