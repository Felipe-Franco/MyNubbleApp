import { ImageBackground, StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Box, Button, Icon, Text } from '@components'

interface HeaderProps {
  imageUri?: string
  imageSize: number
}

export function Header({ imageUri, imageSize }: HeaderProps) {
  const navigation = useNavigation()

  function navigateToPublishPostScreen() {
    if (imageUri) {
      navigation.navigate('PublishPostScreen', { imageUri })
    } else {
      //TODO: tratar erro quando não houver imagem selecionada
    }
  }

  return (
    <Box>
      <ImageBackground
        source={{ uri: imageUri }}
        style={[
          {
            width: imageSize,
            height: imageSize,
          },
          styles.imageBackground,
        ]}
      >
        <Button
          title='Escolher essa'
          marginBottom='s24'
          preset='ghost'
          onPress={navigateToPublishPostScreen}
        />
      </ImageBackground>
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        paddingHorizontal='s24'
        paddingVertical='s16'
      >
        <Text preset='headingSmall'>Sua galeria</Text>
        <Icon name='camera' />
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
