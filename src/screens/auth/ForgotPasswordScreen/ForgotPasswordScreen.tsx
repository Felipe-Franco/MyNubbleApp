import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useForm } from 'react-hook-form'

import { Button, FormTextInput, Screen, Text } from '@components'
import { RootStackParamList } from '@routes'

import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from './forgotPasswordSchema'

type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPasswordScreen'
>

export function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  const { control, handleSubmit, formState } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  function submitForm({ email }: ForgotPasswordSchema) {
    navigation.replace('SuccessScreen', {
      title: 'Enviamos as instruções para seu e-mail!',
      description:
        'Clique no link enviado no seu e-mail para recuperar sua senha' +
        `\n ${email}`,
      icon: {
        name: 'messageRound',
        color: 'primary',
      },
    })
  }

  return (
    <Screen canGoBack={true}>
      <Text preset='headingLarge' marginBottom='s16'>
        Esqueci minha senha
      </Text>
      <Text preset='paragraphLarge' marginBottom='s32'>
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>
      <FormTextInput
        control={control}
        name='email'
        label='Email'
        placeholder='Digite seu e-mail'
        keyboardType='email-address'
      />
      <Button
        disabled={!formState.isValid}
        title='Recuperar senha'
        marginTop='s40'
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  )
}
