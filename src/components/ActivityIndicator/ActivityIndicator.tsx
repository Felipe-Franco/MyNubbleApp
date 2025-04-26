import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native'

import { useAppTheme } from '@hooks'
import { ThemeColor } from '@theme'

interface Props extends Omit<ActivityIndicatorProps, 'color'> {
  color: ThemeColor
}

export function ActivityIndicator({ color }: Props) {
  const { colors } = useAppTheme()
  return <RNActivityIndicator color={colors[color]} />
}
