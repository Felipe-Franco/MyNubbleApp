import React, { useState } from 'react'

import { Icon, TextInput, TextInputProps } from '@components'

export type PasswordInputProps = Omit<TextInputProps, 'RightComponent'>

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true)

  function toggleSecureTextEntry() {
    setIsSecureTextEntry((prevState) => !prevState)
  }

  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      RightComponent={
        <Icon
          name={isSecureTextEntry ? 'eyeOn' : 'eyeOff'}
          onPress={toggleSecureTextEntry}
        />
      }
    />
  )
}
