import { useState } from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native'

import { Button, Screen, Text, TextInput } from '@components'
import { usePostCreate } from '@domain'
import { AppScreenProps } from '@routes'
import { useToastService } from '@services'

type PublishPostScreenProps = AppScreenProps<'PublishPostScreen'>

const IMAGE_SIZE = Dimensions.get('screen').width / 2

export function PublishPostScreen({
  route,
  navigation,
}: PublishPostScreenProps) {
  const [description, setDescription] = useState('')
  const { imageUri } = route.params
  const { showToast } = useToastService()

  const { createPost, isLoading } = usePostCreate({
    onSuccess: () => {
      navigation.navigate('AppTabNavigator', { screen: 'HomeScreen' })
      showToast({ message: 'Foto publicada!', type: 'success' })
    },
  })

  function publishPost() {
    createPost(description, imageUri)
  }

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
        containerProps={{ borderWidth: 0 }}
      />

      <Button
        title='Publicar post'
        loading={isLoading}
        marginTop='s56'
        onPress={publishPost}
        disabled={description.length === 0}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  image: { alignSelf: 'center', marginTop: 20 },
})
