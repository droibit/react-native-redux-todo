import { AppRegistry } from 'react-native';
import App from './src/container/app';
import { name as appName } from './app.json';
// ref. https://github.com/facebook/react-native/issues/18868
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

AppRegistry.registerComponent(appName, () => App);