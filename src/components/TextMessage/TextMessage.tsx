import { useRef } from 'react'
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native'

import { useAppTheme } from '@hooks'

import { Box } from '../Box/Box'
import { $fontFamily, $fontSizes, Text } from '../Text/Text'

interface TextMessageProps extends RNTextInputProps {
  onPressSend: () => void
}

export function TextMessage({
  onPressSend,
  value,
  ...rnTextInputProps
}: TextMessageProps) {
  const inputRef = useRef<RNTextInput>(null)
  const { colors } = useAppTheme()
  const sendIsDisabled = value?.trim().length === 0

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <Pressable onPress={focusInput}>
      <Box
        flexDirection='row'
        alignItems='center'
        backgroundColor='gray5'
        borderRadius='s12'
        paddingHorizontal='s16'
        paddingVertical='s14'
      >
        <RNTextInput
          ref={inputRef}
          value={value}
          style={[$textInputStyle, { color: colors.gray1 }]}
          placeholderTextColor={colors.gray2}
          autoCapitalize='none'
          {...rnTextInputProps}
        />
        <Text
          color={sendIsDisabled ? 'gray2' : 'primary'}
          onPress={onPressSend}
          bold={true}
          disabled={sendIsDisabled}
          marginLeft='s8'
        >
          Enviar
        </Text>
      </Box>
    </Pressable>
  )
}

const $textInputStyle: TextStyle = {
  fontFamily: $fontFamily.regular,
  padding: 0,
  flexGrow: 1,
  flexShrink: 1,
  ...$fontSizes.paragraphMedium,
}
