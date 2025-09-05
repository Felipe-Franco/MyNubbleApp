import { Image, StyleSheet } from 'react-native'

import { Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'
import { useCameraRoll } from '@services'

type NewPostScreenProps = AppTabScreenProps<'NewPostScreen'>

export function NewPostScreen({}: NewPostScreenProps) {
  const { photosList } = useCameraRoll()

  return (
    <Screen scrollable={true}>
      <Text preset='headingLarge'>New Post Screen</Text>
      {photosList.map((photo) => (
        <Image key={photo} source={{ uri: photo }} style={styles.image} />
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  image: { width: 200, height: 200 },
})
