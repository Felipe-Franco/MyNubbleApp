import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import {
  FavoritesScreen,
  HomeScreen,
  MyProfileScreen,
  NewPostScreen,
} from '@screens'

import { AppTabBar } from './AppTabBar'

export type AppTabBottomTabParamList = {
  HomeScreen: undefined
  NewPostScreen: undefined
  FavoritesScreen: undefined
  MyProfileScreen: undefined
}

const Tab = createBottomTabNavigator<AppTabBottomTabParamList>()

export function AppTabNavigator() {
  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderTabBar}
    >
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='NewPostScreen' component={NewPostScreen} />
      <Tab.Screen name='FavoritesScreen' component={FavoritesScreen} />
      <Tab.Screen name='MyProfileScreen' component={MyProfileScreen} />
    </Tab.Navigator>
  )
}
