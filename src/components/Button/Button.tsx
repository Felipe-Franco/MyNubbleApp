import {
  ActivityIndicator,
  Text,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '@components'

import { buttonPresets } from './buttonPresets'

export interface ButtonProps extends TouchableOpacityBoxProps {
  title: string
  loading?: boolean
  preset?: ButtonPreset
}

export type ButtonPreset = 'primary' | 'outline' | 'ghost'

export function Button({
  title,
  preset = 'primary',
  loading,
  disabled,
  ...touchableOpacityProps
}: ButtonProps) {
  const buttonPreset = disabled
    ? buttonPresets[preset].disabled
    : buttonPresets[preset].default

  return (
    <TouchableOpacityBox
      testID='touchable-opacity'
      height={50}
      paddingHorizontal='s20'
      alignItems='center'
      justifyContent='center'
      borderRadius='s16'
      disabled={disabled || loading}
      {...buttonPreset.container}
      {...touchableOpacityProps}
    >
      {loading ? (
        <ActivityIndicator color={buttonPreset.content.color} />
      ) : (
        <Text
          preset='paragraphMedium'
          bold={true}
          color={buttonPreset.content.color}
          {...buttonPreset.content.textProps}
        >
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  )
}
