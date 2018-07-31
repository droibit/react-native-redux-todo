import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavigationScreenOptions,
  NavigationScreenProp,
  NavigationRoute,
  NavigationScreenConfig,
} from 'react-navigation';
import EditTask from './editTask';
import { CloseHeaderButton, DoneHeaderButton } from '../../shared/headerItem';
import { Result } from '../../../module/model/result';
import { TaskStateProps } from '../../../module/state/stateType';
import { ReduxThunkDispatch } from '../../../module/state/reduxActionType';
import * as Actions from '../../../module/state/task/actionCreator';
import { Toast } from 'native-base';
import I18n from '../../../i18n';
import { Task } from '../../../module/model/task';

export type NavigationParams = {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  disabledDoneButton: boolean;
  onDoneButtonPressed(): void;
};

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
  updateTaskResult: Result<Task>;
  updateTask(taskId: string, title: string, description: string): void;
};

type State = {
  taskId: string;
  title: string;
  description: string;
};

class UpdateTaskScreen extends Component<Props, State> {
  static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({
    navigation,
  }) => {
    // const { disabledDoneButton, onDoneButtonPressed } = navigation.state.params as NavigationParams
    return {
      title: I18n.t('updateTask'),
      headerLeft: <CloseHeaderButton onPress={() => navigation.goBack(null)} />,
      headerRight: (
        <DoneHeaderButton
          disabled={navigation.getParam('disabledDoneButton')}
          onPress={navigation.getParam('onDoneButtonPressed')}
        />
      ),
    };
  };

  constructor(props: Props) {
    super(props);
    console.log(`UpdateTaskScreen(props=${JSON.stringify(props)})`);

    const { navigation } = this.props;
    this.state = {
      taskId: navigation.getParam('taskId'),
      title: navigation.getParam('taskTitle'),
      description: navigation.getParam('taskDescription'),
    };
    this.props.navigation.setParams({
      disabledDoneButton: false,
      onDoneButtonPressed: this.onDoneButtonPressed.bind(this),
    });
  }

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any,
  ) {
    console.log(`UpdateTaskScreen.componentDidUpdate(
        prevProps=${JSON.stringify(prevProps.updateTaskResult)},
        props=${JSON.stringify(this.props.updateTaskResult)},
    )`);

    if (this.props.updateTaskResult !== prevProps.updateTaskResult) {
      this.onUpdateTask(this.props.updateTaskResult);
    }
  }

  private onUpdateTask(result: Result<Task>) {
    const { navigation } = this.props;
    if (result.isSuccess) {
      console.log(`Update task success: ${JSON.stringify(result.data)}.`);
      navigation.goBack(null);
    } else if (result.isError) {
      Toast.show({
        text: 'Failed to edit TO-DO.',
        type: 'danger',
      });
      console.log(`Update task error: ${result.error!.message}.`);
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
    console.log('#onDoneButtonPressed()');
    if (!this.props.updateTaskResult.inProgress) {
      const { taskId, title, description } = this.state;
      this.props.updateTask(taskId, title, description);
      console.log('Dispatch update task action.');
    }
  }

  private onTitleChanged(title: string) {
    console.log(`#onTitleChanged(title=${title})`);
    this.setState({ title });
    this.props.navigation.setParams({ disabledDoneButton: title === '' });
  }

  private onDescriptionChanged(description: string) {
    this.setState({ description });
  }
}

const mapStateToProps = (state: TaskStateProps): Partial<Props> => {
  return {
    updateTaskResult: state.task.updateResult,
  };
};

const mapDispatchToProps = (dispatch: ReduxThunkDispatch): Partial<Props> => {
  return {
    updateTask: (taskId, title, description) => {
      dispatch(Actions.updateTask(taskId, title, description));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateTaskScreen);
