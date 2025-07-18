import {
  ActivityIndicator,
  Text,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '@components'

import { buttonPresets } from './buttonPresets'

interface ButtonProps extends TouchableOpacityBoxProps {
  title: string
  loading?: boolean
  preset?: ButtonPreset
}

export type ButtonPreset = 'primary' | 'outline'

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
        <ActivityIndicator color={buttonPreset.contentColor} />
      ) : (
        <Text
          preset='paragraphMedium'
          bold={true}
          color={buttonPreset.contentColor}
        >
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  )
}
