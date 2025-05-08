import { Button, Screen, Text } from '@components'
import { AppScreenProps } from '@routes'

type SettingsScreenProps = AppScreenProps<'SettingsScreen'>

export function SettingsScreen({ route, navigation }: SettingsScreenProps) {
  const username = route.params.username

  return (
    <Screen canGoBack={true}>
      <Text preset='headingSmall'>Settings Screen</Text>
      <Text preset='headingMedium'>Be Welcome {username}</Text>

      <Button
        title='New Post'
        onPress={() => {
          navigation.popTo('AppTabNavigator', {
            screen: 'NewPostScreen',
          })
        }}
      />
    </Screen>
  )
}
