import { useNavigation } from '@react-navigation/native'

import { Box, Icon, ScreenProps, Text, TouchableOpacityBox } from '@components'

const ICON_SIZE = 20

type ScreenHeaderProps = Pick<ScreenProps, 'canGoBack' | 'title'>

export function ScreenHeader({ canGoBack, title }: ScreenHeaderProps) {
  const navigation = useNavigation()

  if (!canGoBack && !title) return null

  return (
    <Box
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      marginBottom='s24'
    >
      {canGoBack && (
        <TouchableOpacityBox
          onPress={navigation.goBack}
          flexDirection='row'
          alignItems='center'
        >
          <Icon name='arrowLeft' color='primary' size={ICON_SIZE} />
          {!title && (
            <Text preset='paragraphMedium' semiBold={true} marginLeft='s8'>
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}

      {title && (
        <>
          <Text preset='headingSmall'>{title}</Text>
          <Box width={ICON_SIZE} height={ICON_SIZE} />
        </>
      )}
    </Box>
  )
}
