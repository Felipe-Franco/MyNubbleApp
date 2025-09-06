import { useState } from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native'

import { Button, Screen, Text, TextInput } from '@components'
import { AppScreenProps } from '@routes'

type PublishPostScreenProps = AppScreenProps<'PublishPostScreen'>

const IMAGE_SIZE = Dimensions.get('window').width / 2

export function PublishPostScreen({ route }: PublishPostScreenProps) {
  const [description, setDescription] = useState('')
  const { imageUri } = route.params

  return (
    <Screen canGoBack={true} title='Novo post' scrollable={true}>
      <Image
        source={{ uri: imageUri }}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        style={styles.image}
      />

      <Text preset='headingSmall' marginTop='s32' marginBottom='s10'>
        Escreva uma legenda
      </Text>

      <TextInput
        multiline={true}
        value={description}
        onChangeText={setDescription}
        placeholder='Digite aqui...'
        containerProps={{ borderWidth: 0, padding: 's0' }}
      />

      <Button title='Publicar post' marginTop='s56' />
    </Screen>
  )
}

const styles = StyleSheet.create({
  image: { alignSelf: 'center', marginTop: 20 },
})
