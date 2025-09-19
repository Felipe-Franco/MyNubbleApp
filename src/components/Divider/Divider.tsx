import { StyleSheet } from 'react-native'

import { Box } from '@components'

export function Divider() {
  return (
    <Box
      height={StyleSheet.hairlineWidth}
      width='100%'
      backgroundColor='onBackgroundGray2'
    />
  )
}
