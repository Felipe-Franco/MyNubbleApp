import { ButtonPreset, TextProps, TouchableOpacityBoxProps } from '@components'
import { ThemeColor } from '@theme'

export interface ButtonUI {
  container: TouchableOpacityBoxProps

  content: { color: ThemeColor; textProps?: TextProps }
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
      content: { color: 'primaryContrast' },
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: { color: 'gray2' },
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: { color: 'primary' },
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
      },
      content: { color: 'gray2' },
    },
  },
  ghost: {
    default: {
      container: { backgroundColor: 'white70', height: 40 },
      content: {
        color: 'grayBlack',
        textProps: { preset: 'paragraphSmall', bold: false },
      },
    },
    disabled: {
      container: {
        backgroundColor: 'grayWhite',
      },
      content: {
        color: 'grayBlack',
      },
    },
  },
}
