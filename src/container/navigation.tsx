import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import Bootstrap from "./bootstrap/bootstrap";
import TaskListScreen from "./task/list/taskListScteen";
import TaskDetailScreen from "./task/detail/detailScreen";
import statisticsScreen from "./statistics/statisticsScreen";
import NewTaskScreen from "./task/edit/newTaskScreen";
import TaskFilterChooserScreen from "./task/filter/FilterChooserScreen";

export const SCREEN_BOOTSTRAP = "Bootstrap";
export const SCREEN_MAIN = "Main";
export const SCREEN_MAIN_TASK_TAB = "Tasks";
export const SCREEN_TASK_LIST = "List";
export const SCREEN_TASK_DETAIL = "Detail";
export const SCREEN_STATISTICS = "Statistics";
export const SCREEN_TASK_NEW = "NewTask";
export const SCREEN_TASK_FILTER_CHOOSER = "TaskFilterChooser";

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
    Detail: TaskDetailScreen,
  }),
  Statistics: createStackNavigator({
    Statistics: statisticsScreen
  }),
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = mainTabIcons[routeName].icon;
        // console.log(`Selected Tab: ${routeName}, icon:${iconName}`);
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
const MainModal = createSwitchNavigator({
  NewTask: createStackNavigator({
    NewTask: NewTaskScreen,
  }, {
      mode: "modal",
    }),
  TaskFilterChooser: createStackNavigator({
    TaskFilterChooser: TaskFilterChooserScreen,
  }, {
      mode: "modal",
    }),
});

const MainStack = createStackNavigator({
  Main: MainTab,
  Modal: MainModal,
}, {
    initialRouteName: SCREEN_MAIN,
    headerMode: "none",
  })

export const AppNavigator = createSwitchNavigator({
  Bootstrap: Bootstrap,
  Main: MainStack,
}, {
    initialRouteName: SCREEN_BOOTSTRAP,
  });

