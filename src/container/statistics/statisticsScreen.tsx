import { Container, Content, Icon } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  NavigationRoute,
  NavigationScreenConfig,
  NavigationScreenOptions,
  NavigationScreenProp,
} from "react-navigation";
import { connect } from "react-redux";
import I18n from "../../i18n";
import { TaskStateProps } from "../../module/state/stateType";
import {
  countActiveTask,
  countCompletedTask,
} from "../../module/state/task/selector";
import { SCREEN_SETTINGS } from "../navigation";
import { SettingsHeaderButton } from "../shared/headerItem";

interface NavigationParams {
  onSettingsHeaderButtonPress(): void;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
  activeTaskCount: number;
  completedTaskCount: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

class StatisticsScreen extends Component<Props> {
  // noinspection JSUnusedGlobalSymbols
  public static navigationOptions: NavigationScreenConfig<
    NavigationScreenOptions
  > = ({ navigation }) => {
    return {
      headerRight: (
        <SettingsHeaderButton
          onPress={navigation.getParam("onSettingsHeaderButtonPress")}
        />
      ),
      title: I18n.t("statistics"),
    };
  };

  constructor(props: Props) {
    super(props);

    this.props.navigation.setParams({
      onSettingsHeaderButtonPress: this.onSettingsHeaderButtonPress.bind(this),
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
    completedTaskCount: countCompletedTask(state),
  };
};

// @ts-ignore
export default connect(mapStateToProps)(StatisticsScreen);
