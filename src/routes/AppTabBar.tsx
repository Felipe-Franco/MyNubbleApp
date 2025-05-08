import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { Box, Icon, IconProps, Text, TouchableOpacityBox } from '@components'
import { useAppSafeArea } from '@hooks'
import { $shadowStyle } from '@theme'

import { AppTabBottomTabParamList } from './AppTabNavigator'

const mapScreenToProps: Record<
  keyof AppTabBottomTabParamList,
  {
    label: string
    iconFocused: IconProps['name']
    iconUnfocused: IconProps['name']
  }
> = {
  HomeScreen: {
    label: 'Início',
    iconFocused: 'homeFill',
    iconUnfocused: 'home',
  },
  NewPostScreen: {
    label: 'Novo post',
    iconFocused: 'newPost',
    iconUnfocused: 'newPost',
  },
  FavoritesScreen: {
    label: 'Favoritos',
    iconFocused: 'bookmarkFill',
    iconUnfocused: 'bookmark',
  },
  MyProfileScreen: {
    label: 'Meu perfil',
    iconFocused: 'profileFill',
    iconUnfocused: 'profile',
  },
}

export function AppTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { bottom } = useAppSafeArea()

  return (
    <Box
      flexDirection='row'
      backgroundColor='background'
      paddingTop='s12'
      style={[{ paddingBottom: bottom }, $shadowStyle]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const tabItemProps =
          mapScreenToProps[route.name as keyof AppTabBottomTabParamList]

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacityBox
            key={index}
            flex={1}
            activeOpacity={1}
            alignItems='center'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon
              name={
                isFocused
                  ? tabItemProps.iconFocused
                  : tabItemProps.iconUnfocused
              }
              color={isFocused ? 'primary' : 'backgroundContrast'}
            />
            <Text
              preset='paragraphCaption'
              color={isFocused ? 'primary' : 'backgroundContrast'}
              marginTop='s4'
              semiBold={true}
            >
              {tabItemProps.label}
            </Text>
          </TouchableOpacityBox>
        )
      })}
    </Box>
  )
}
