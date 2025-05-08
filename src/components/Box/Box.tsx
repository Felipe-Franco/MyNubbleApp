import { ComponentProps } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

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

export type TouchableOpacityBoxProps = TouchableOpacityProps &
  BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme>

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>([backgroundColor, spacing, layout, border], TouchableOpacity)
