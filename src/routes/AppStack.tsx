import { NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  DarkModeScreen,
  PostCommentScreen,
  ProfileScreen,
  PublishPostScreen,
  SearchScreen,
  SettingsScreen,
} from '@screens'

import { CameraScreen } from '../screens/app/CameraScreen/CameraScreen'

import { AppTabBottomTabParamList, AppTabNavigator } from './AppTabNavigator'

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>
  SettingsScreen: undefined
  PostCommentScreen: {
    postId: number
    postAuthorId: number
  }
  ProfileScreen: {
    userId: number
  }
  SearchScreen: undefined
  PublishPostScreen: {
    imageUri: string
  }
  CameraScreen: undefined
  DarkModeScreen: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

interface AppStackProps {
  initialRouteName?: keyof AppStackParamList
}

export function AppStack({
  initialRouteName = 'AppTabNavigator',
}: AppStackProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='AppTabNavigator' component={AppTabNavigator} />
      <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
      <Stack.Screen name='PostCommentScreen' component={PostCommentScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      <Stack.Screen name='PublishPostScreen' component={PublishPostScreen} />
      <Stack.Screen name='CameraScreen' component={CameraScreen} />
      <Stack.Screen name='DarkModeScreen' component={DarkModeScreen} />
    </Stack.Navigator>
  )
}
