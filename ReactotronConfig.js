import Reactotron, { asyncStorage, networking } from 'reactotron-react-native'

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(networking())
  .use(asyncStorage())
  .connect() // let's connect!
