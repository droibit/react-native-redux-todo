import React, { Component } from "react";
import { connect } from "react-redux";
import {
  NavigationScreenOptions,
  NavigationScreenProp,
  NavigationRoute,
  NavigationScreenConfig
} from "react-navigation";
import EditTask from "./editTask";
import { CloseHeaderButton, DoneHeaderButton } from "./headerItem";

type NavigationParams = {
  disabledDoneButton: boolean;
  onDoneButtonPressed(): void;
};

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
};

type State = {
  title: string;
  description: string;
};

class NewTaskScreen extends Component<Props, State> {
  static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({
    navigation
  }) => {
    // const { disabledDoneButton, onDoneButtonPressed } = navigation.state.params as NavigationParams
    return {
      title: "New TO-DO",
      headerLeft: <CloseHeaderButton onPress={() => navigation.goBack(null)} />,
      headerRight: (
        <DoneHeaderButton
          disabled={navigation.getParam("disabledDoneButton")}
          onPress={navigation.getParam("onDoneButtonPressed")}
        />
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      title: "",
      description: ""
    };
    this.props.navigation.setParams({
      disabledDoneButton: true,
      onDoneButtonPressed: this.onDoneButtonPressed.bind(this)
    });
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

export default connect()(NewTaskScreen);
