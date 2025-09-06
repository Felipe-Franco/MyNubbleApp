import { useNavigation } from '@react-navigation/native'

import {
  Box,
  BoxProps,
  Icon,
  ScreenProps,
  Text,
  TouchableOpacityBox,
} from '@components'

const ICON_SIZE = 20

type ScreenHeaderProps = Pick<
  ScreenProps,
  'canGoBack' | 'title' | 'HeaderComponent'
> &
  BoxProps

export function ScreenHeader({
  canGoBack,
  title,
  HeaderComponent,
  ...boxProps
}: ScreenHeaderProps) {
  const navigation = useNavigation()

  if (!canGoBack && !title && !HeaderComponent) return null

  const showBackLabel = !title && !HeaderComponent

  return (
    <Box
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      marginBottom='s24'
      {...boxProps}
    >
      {canGoBack && (
        <TouchableOpacityBox
          testID='screen-back-button'
          flexDirection='row'
          alignItems='center'
          marginRight={showBackLabel ? 's10' : undefined}
          onPress={navigation.goBack}
        >
          <Icon name='arrowLeft' color='primary' size={ICON_SIZE} />
          {showBackLabel && (
            <Text preset='paragraphMedium' semiBold={true} marginLeft='s8'>
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}

      {HeaderComponent}

      {title && (
        <>
          <Text preset='headingSmall'>{title}</Text>
          <Box width={ICON_SIZE} height={ICON_SIZE} />
        </>
      )}
    </Box>
  )
}
