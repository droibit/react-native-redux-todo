import React, { Component } from "react";
import { connect } from "react-redux";
import { 
  NavigationScreenOptions, 
  NavigationScreenProp,
  NavigationRoute
 } from "react-navigation";
import { Action } from "redux";
import Loading from "./loading";
import EmptyView from "./emptyView";
import {
  TaskStateProps,
  AppSettingsStateProps
} from "../../../module/state/type";
import { filteredAndSortedTasks } from "../../../module/state/task/selector";
import { Task } from "../../../module/model/task";
import * as Actions from "../../../module/state/task/action";
import { ReduxThunkDispatch } from "../../../module/state/reduxActionType";
import { Container } from "native-base";
import { SCREEN_TASK_NEW } from "../../navigation";

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
  tasks: ReadonlyArray<Task>;
  loading: boolean;
  getTasks(): void;
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
      return { loading: nextProps.loading };
    }
    return null;
  }

  constructor(props: Props) {
    super(props);
    console.log(`TaskListScreen.props: ${JSON.stringify(props)}`);
    this.state = {
      loading: true,
      mounted: false
    };
  }

  public componentDidMount() {
    console.log("TaskListScreen.componentDidMount()");
    this.props.getTasks();
  }

  public render() {
    console.log(`TaskListScreen.render(state=${JSON.stringify(this.state)}`);
    return (
      <Container>
        {this.renderContent()}
      </Container>
    );
  }

  private renderContent() {
    const { loading } = this.state;
    if (loading) {
      return <Loading label="Loading..." />; 
    }
    return <EmptyView 
    text="No TO-DOs." 
    onAddClick={this.onAddButtonClick.bind(this)}
    />;
  }

  private onAddButtonClick() {
    console.log("#onAddButtonClick()");
    this.props.navigation.navigate(SCREEN_TASK_NEW)
  }
}

const mapStateToProps = (
  state: TaskStateProps & AppSettingsStateProps
): Partial<Props> => {
  return {
    tasks: filteredAndSortedTasks(state),
    loading: state.task.loadingResult.inProgress,
    // timestamp: Date.now()
  };
};

const mapDispatchToProps = (
  dispatch: ReduxThunkDispatch<Action>
): Partial<Props> => {
  return {
    getTasks: () => {
      dispatch(Actions.getTasks());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListScreen);
