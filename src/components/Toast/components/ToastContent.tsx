import { Dimensions } from 'react-native'

import { Box, Icon, IconProps, Text } from '@components'
import { Toast, ToastType } from '@services'
import { $shadowStyle } from '@theme'

const MAX_WIDTH = Dimensions.get('screen').width * 0.9

interface ToastContentProps {
  toast: Toast
}

export function ToastContent({ toast }: ToastContentProps) {
  const toastType = toast.type || 'success'

  return (
    <Box
      flexDirection='row'
      maxWidth={MAX_WIDTH}
      padding='s16'
      backgroundColor='background'
      borderRadius='s16'
      alignItems='center'
      opacity={0.95}
      style={$shadowStyle}
    >
      <Icon {...mapTypeToIcon[toastType]} size={32} />
      <Text
        flexShrink={1}
        preset='paragraphMedium'
        bold={true}
        marginLeft='s16'
      >
        {toast?.message}
      </Text>
    </Box>
  )
}

const mapTypeToIcon: Record<ToastType, IconProps> = {
  success: {
    name: 'checkRound',
    color: 'success',
  },
  error: {
    name: 'errorRound',
    color: 'error',
  },
}
