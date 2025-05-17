import { Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'

type MyProfileScreenProps = AppTabScreenProps<'MyProfileScreen'>

export function MyProfileScreen({}: MyProfileScreenProps) {
  return (
    <Screen canGoBack={true}>
      <Text>My Profile Screen</Text>
    </Screen>
  )
}
