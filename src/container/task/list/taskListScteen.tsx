import React, {
  Component
} from "react";
import { Text, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Spinner,
} from 'native-base';
import { connect } from "react-redux";
import { NavigationScreenOptions } from "react-navigation";
import { Action } from "redux";
import { List } from "immutable";
import Loading from "./loading";
import EmptyView from "./emptyView";
import {
  TaskStateProps,
  AppSettingsStateProps,
} from "../../../module/state/type";
import { filteredAndSortedTasks } from "../../../module/state/task/selector";
import { Task } from "../../../module/model/task";
import * as Actions from "../../../module/state/task/action";
import { ReduxThunkDispatch } from "../../../module/state/reduxActionType";

type Props = {
  tasks: List<Task>,
  getTasks(): void,
};
type State = {
  loading: boolean;
};
class TaskListScreen extends Component<Props, State> {

  static navigationOptions: NavigationScreenOptions = {
    title: "TO-DO",
  };

  constructor(props: Props) {
    super(props);
    this.state = { loading: true, };
  }

  public componentDidMount() {
    console.log("TaskListScreen.componentDidMount()");
    this.props.getTasks();
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>) {
    console.log("TaskListScreen.componentWillReceiveProps()");
    this.setState({ loading: false });
  }

  public render() {
    console.log(`TaskListScreen.state=${JSON.stringify(this.state)}`);
    const { loading } = this.state;

    if (loading) {
      return <Loading label="Loading..." />
    }
    return <EmptyView />
  }
}

const mapStateToProps = (state: TaskStateProps & AppSettingsStateProps) => {
  return {
    tasks: filteredAndSortedTasks(state)
  };
};

const mapDispatchToProps = (dispatch: ReduxThunkDispatch<Action>) => {
  return {
    getTasks: () => {
      dispatch(Actions.getTasks());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListScreen);