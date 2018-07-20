import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from "react-navigation";
import Bootstrap from "./bootstrap/bootstrap";
import TaskListScreen from "./task/list/taskListScteen";


export const AppNavigator = createSwitchNavigator({
  // Bootstrap: Bootstrap,
  List: TaskListScreen,
}, {
    initialRouteName: "List"
});