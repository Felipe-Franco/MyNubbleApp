import { Box, Icon, Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'
import { useAuthCredentials } from '@services'

type MyProfileScreenProps = AppTabScreenProps<'MyProfileScreen'>

export function MyProfileScreen({ navigation }: MyProfileScreenProps) {
  const { authCredentials } = useAuthCredentials()
  const name = authCredentials?.user.fullName

  function navigateToSettingsScreen() {
    navigation.navigate('SettingsScreen')
  }

  return (
    <Screen canGoBack={true}>
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Text preset='headingMedium'>{name}</Text>
        <Icon name='settings' onPress={navigateToSettingsScreen} />
      </Box>
    </Screen>
  )
}
