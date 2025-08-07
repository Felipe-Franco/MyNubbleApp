import { ComponentProps } from 'react'
import {
  Pressable,
  PressableProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  createBox,
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
} from '@shopify/restyle'

import { Theme } from '@theme'

export const Box = createBox<Theme>()
export type BoxProps = ComponentProps<typeof Box>

type RestyleProps = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme>

export type TouchableOpacityBoxProps = TouchableOpacityProps & RestyleProps

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>([backgroundColor, spacing, layout, border], TouchableOpacity)

export type PressableBoxProps = PressableProps & RestyleProps

export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
  [backgroundColor, spacing, layout, border],
  Pressable,
)
