import { ReactElement } from 'react'
import { GestureResponderEvent } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import {
  Box,
  PressableBox,
  PressableBoxProps,
  ProfileAvatar,
  ProfileAvatarProps,
  Text,
} from '@components'
import { User } from '@domain'

type PostHeaderProps = {
  user: User
  profileAvatarProps?: Pick<ProfileAvatarProps, 'borderRadius' | 'size'>
  RightComponent?: ReactElement
} & PressableBoxProps

export function ProfileUser({
  user,
  onPress,
  profileAvatarProps,
  RightComponent,
  ...pressableBoxProps
}: PostHeaderProps) {
  const navigation = useNavigation()

  function handleOnPress(event: GestureResponderEvent) {
    if (onPress) {
      onPress(event)
    }
    navigation.navigate('ProfileScreen', {
      userId: user.id,
    })
  }

  return (
    <PressableBox
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      onPress={handleOnPress}
      {...pressableBoxProps}
    >
      <Box flexDirection='row' alignItems='center'>
        <ProfileAvatar {...profileAvatarProps} profileURL={user.profileUrl} />
        <Text preset='paragraphMedium' semiBold={true} marginLeft='s12'>
          {user.username}
        </Text>
      </Box>

      {RightComponent}
    </PressableBox>
  )
}
