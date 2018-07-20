import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import Bootstrap from "./bootstrap/bootstrap";
import TaskListScreen from "./task/list/taskListScteen";
import statisticsScreen from "./statistics/statisticsScreen";

export const SCREEN_BOOTSTRAP = "Bootstrap";
export const SCREEN_MAIN = "Main";
export const SCREEN_MAIN_TASK_TAB = "Tasks";
export const SCREEN_TASK_LIST = "List";
export const SCREEN_STATISTICS = "Statistics";

type TabIcon = {
  icon: string;
  label: string;
}
const mainTabIcons: { [key: string]: TabIcon } = {
  Tasks: {
    icon: "list",
    label: "TO-DO",
  },
  Statistics: {
    icon: "assessment",
    label: "Statistics",
  },
};
const MainTab = createBottomTabNavigator({
  Tasks: createStackNavigator({
    List: TaskListScreen,
  }),
  Statistics: createStackNavigator({
    Statistics: statisticsScreen
  }),
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = mainTabIcons[routeName].icon;
        console.log(`Selected Tab: ${routeName}, icon:${iconName}`);
        return <Icon
          name={iconName}
          size={24}
          color={tintColor!}
        />
      },
      tabBarLabel: mainTabIcons[navigation.state.routeName].label,
    }),
  }
);

export const AppNavigator = createSwitchNavigator({
  Bootstrap: Bootstrap,
  Main: MainTab,
}, {
    initialRouteName: SCREEN_BOOTSTRAP,
  });

