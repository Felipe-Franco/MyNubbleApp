import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native'

import { useAppTheme } from '@hooks'
import { ThemeColor } from '@theme'

interface Props extends Omit<ActivityIndicatorProps, 'color'> {
  color?: ThemeColor
}

export function ActivityIndicator({ color = 'primary', ...rest }: Props) {
  const { colors } = useAppTheme()
  return (
    <RNActivityIndicator
      testID='activity-indicator'
      color={colors[color]}
      {...rest}
    />
  )
}
