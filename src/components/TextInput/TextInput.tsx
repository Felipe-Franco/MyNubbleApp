import { ReactElement, useRef } from 'react'
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native'

import { useAppTheme } from '@hooks'

import { Box, BoxProps } from '../Box/Box'
import { $fontFamily, $fontSizes, Text } from '../Text/Text'

export interface TextInputProps extends RNTextInputProps {
  label?: string
  errorMessage?: string
  LeftComponent?: ReactElement
  RightComponent?: ReactElement
  boxProps?: BoxProps
  containerProps?: BoxProps
}

export function TextInput({
  label,
  errorMessage,
  LeftComponent,
  RightComponent,
  boxProps,
  containerProps,
  ...rnTextInputProps
}: TextInputProps) {
  const { colors } = useAppTheme()
  const inputRef = useRef<RNTextInput>(null)

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <Box flexGrow={1} flexShrink={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text preset='paragraphMedium' marginBottom='s4'>
            {label}
          </Text>
        )}

        <Box
          flexDirection='row'
          padding='s16'
          borderColor={errorMessage ? 'error' : 'gray2'}
          borderWidth={errorMessage ? 2 : 1}
          borderRadius='s12'
          {...containerProps}
        >
          {LeftComponent && (
            <Box marginRight='s16' justifyContent='center'>
              {LeftComponent}
            </Box>
          )}

          <RNTextInput
            ref={inputRef}
            style={$textInputStyle}
            placeholderTextColor={colors.gray2}
            autoCapitalize='none'
            {...rnTextInputProps}
          />

          {RightComponent && (
            <Box marginLeft='s16' justifyContent='center'>
              {RightComponent}
            </Box>
          )}
        </Box>

        {errorMessage && (
          <Text preset='paragraphSmall' bold={true} color='error'>
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  )
}

const $textInputStyle: TextStyle = {
  fontFamily: $fontFamily.regular,
  padding: 0,
  flexGrow: 1,
  flexShrink: 1,
  ...$fontSizes.paragraphMedium,
}
