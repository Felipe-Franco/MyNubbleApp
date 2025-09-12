if (__DEV__) {
  require('./ReactotronConfig')
}
import { AppRegistry, Platform } from 'react-native'
process.env.EXPO_OS = Platform.OS

import App from './App'
import { name as appName } from './app'

AppRegistry.registerComponent(appName, () => App)
