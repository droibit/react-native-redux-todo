import App from './src/App';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent("app", () => App);
Navigation.startSingleScreenApp({
  screen: {
    screen: "app",
    title: "ReactNativeReduxTodo"
  }
});
