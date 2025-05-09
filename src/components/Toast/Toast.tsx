import { useEffect } from 'react'
import { Dimensions } from 'react-native'

import { Box, Icon, Text } from '@components'
import { useToast, useToastService } from '@services'
import { $shadowStyle } from '@theme'

interface ToastProps {}

const MAX_WIDTH = Dimensions.get('screen').width * 0.9

export function Toast({}: ToastProps) {
  const toast = useToast()
  const { hideToast } = useToastService()

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        hideToast()
      }, toast.duration || 2000)
    }
  }, [toast, hideToast])

  if (!toast) {
    return null
  }

  return (
    <Box
      flexDirection='row'
      maxWidth={MAX_WIDTH}
      position='absolute'
      padding='s16'
      backgroundColor='background'
      borderRadius='s16'
      alignItems='center'
      alignSelf='center'
      opacity={0.95}
      style={$shadowStyle}
    >
      <Icon name='checkRound' size={32} color='success' />
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
