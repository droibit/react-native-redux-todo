import { Toast } from "native-base";
import React, { Component } from "react";
import {
  NavigationRoute,
  NavigationScreenConfig,
  NavigationScreenOptions,
  NavigationScreenProp,
} from "react-navigation";
import { connect } from "react-redux";
import I18n from "../../../i18n";
import { Result } from "../../../module/model/result";
import { Task } from "../../../module/model/task";
import { ReduxThunkDispatch } from "../../../module/state/reduxActionType";
import { TaskStateProps } from "../../../module/state/stateType";
import * as Actions from "../../../module/state/task/actionCreator";
import { CloseHeaderButton, DoneHeaderButton } from "../../shared/headerItem";
import EditTask from "./editTask";

export interface NavigationParams {
  disabledDoneButton: boolean;
  onDoneButtonPressed(): void;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
  createTaskResult: Result<Task>;
  createTask(title: string, description: string): void;
}

interface State {
  title: string;
  description: string;
}

class NewTaskScreen extends Component<Props, State> {
  // noinspection JSUnusedGlobalSymbols
  public static navigationOptions: NavigationScreenConfig<
    NavigationScreenOptions
  > = ({ navigation }) => {
    // const { disabledDoneButton, onDoneButtonPressed } = navigation.state.params as NavigationParams
    return {
      headerLeft: <CloseHeaderButton onPress={() => navigation.goBack(null)} />,
      headerRight: (
        <DoneHeaderButton
          disabled={navigation.getParam("disabledDoneButton")}
          onPress={navigation.getParam("onDoneButtonPressed")}
        />
      ),
      title: I18n.t("newTask"),
    };
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      title: "",
      description: "",
    };
    this.props.navigation.setParams({
      disabledDoneButton: true,
      onDoneButtonPressed: this.onDoneButtonPressed.bind(this),
    });
  }

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any,
  ) {
    console.log(`NewTaskScreen.componentDidUpdate(
        prevProps=${JSON.stringify(prevProps.createTaskResult)},
        props=${JSON.stringify(this.props.createTaskResult)},
    )`);

    if (this.props.createTaskResult !== prevProps.createTaskResult) {
      this.onCreateTask(this.props.createTaskResult);
    }
  }

  private onCreateTask(result: Result<Task>) {
    const { navigation } = this.props;
    if (result.isSuccess) {
      console.log(`Create task success: ${JSON.stringify(result.data)}.`);
      navigation.goBack(null);
    } else if (result.isError) {
      Toast.show({
        text: "Failed to create new TO-DO.",
        type: "danger",
      });
      console.log(`Create task error: ${result.error!.message}.`);
    }
  }

  public render() {
    const { title, description } = this.state;
    return (
      <EditTask
        title={title}
        description={description}
        onTitleChanged={this.onTitleChanged.bind(this)}
        onDescriptionChanged={this.onDescriptionChanged.bind(this)}
      />
    );
  }

  private onDoneButtonPressed() {
    console.log("#onDoneButtonPressed()");
    if (!this.props.createTaskResult.inProgress) {
      const { title, description } = this.state;
      this.props.createTask(title, description);
      console.log("Dispatch create task action.");
    }
  }

  private onTitleChanged(title: string) {
    console.log(`#onTitleChanged(title=${title})`);
    this.setState({ title });
    this.props.navigation.setParams({ disabledDoneButton: title === "" });
  }

  private onDescriptionChanged(description: string) {
    this.setState({ description });
  }
}

const mapStateToProps = (state: TaskStateProps): Partial<Props> => {
  return {
    createTaskResult: state.task.createResult,
  };
};

const mapDispatchToProps = (dispatch: ReduxThunkDispatch): Partial<Props> => {
  return {
    createTask: (title, description) => {
      dispatch(Actions.createTask(title, description));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(NewTaskScreen);
