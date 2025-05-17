import { ButtonPreset, TouchableOpacityBoxProps } from '@components'
import { ThemeColor } from '@theme'

export interface ButtonUI {
  container: TouchableOpacityBoxProps
  contentColor: ThemeColor
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI
    disabled: ButtonUI
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      contentColor: 'primaryContrast',
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      contentColor: 'gray2',
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      contentColor: 'primary',
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
      },
      contentColor: 'gray2',
    },
  },
}
