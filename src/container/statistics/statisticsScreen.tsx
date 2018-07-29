import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  NavigationScreenOptions,
  NavigationScreenConfig,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { Container, Content, Icon } from "native-base";
import { TaskStateProps } from "../../module/state/type";
import {
  countCompletedTask,
  countActiveTask
} from "../../module/state/task/selector";
import I18n from "../../i18n";
import { SettingsHeaderButton } from "../shared/headerItem";
import { SCREEN_SETTINGS } from "../navigation";

type NavigationParams = {
  onSettingsHeaderButtonPress(): void;
};

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
  activeTaskCount: number;
  completedTaskCount: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8
  }
});

class StatisticsScreen extends Component<Props> {
  static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({
    navigation
  }) => {
    return {
      title: I18n.t("statistics"),
      headerRight: (
        <SettingsHeaderButton
          onPress={navigation.getParam("onSettingsHeaderButtonPress")}
        />
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.props.navigation.setParams({
      onSettingsHeaderButtonPress: this.onSettingsHeaderButtonPress.bind(this)
    });
  }

  public render() {
    const { activeTaskCount, completedTaskCount } = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <View style={styles.item}>
            <Icon name="schedule" type="MaterialIcons" />
            <Text style={styles.label}>
              {I18n.t("statisticsActiveTasks") + activeTaskCount}
            </Text>
          </View>
          <View style={styles.item}>
            <Icon name="done" type="MaterialIcons" />
            <Text style={styles.label}>
              {I18n.t("statisticsCompletedTasks") + completedTaskCount}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }

  private onSettingsHeaderButtonPress() {
    console.log("#onSettingsHeaderButtonPress()");
    this.props.navigation.navigate(SCREEN_SETTINGS);
  }
}

const mapStateToProps = (state: TaskStateProps): Partial<Props> => {
  return {
    activeTaskCount: countActiveTask(state),
    completedTaskCount: countCompletedTask(state)
  };
};

export default connect(mapStateToProps)(StatisticsScreen);
