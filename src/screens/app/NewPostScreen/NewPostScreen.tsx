import { Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'

type NewPostScreenProps = AppTabScreenProps<'NewPostScreen'>

export function NewPostScreen({}: NewPostScreenProps) {
  return (
    <Screen>
      <Text preset='headingLarge'>New Post Screen</Text>
    </Screen>
  )
}
