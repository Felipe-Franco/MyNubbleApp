import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useForm } from 'react-hook-form'

import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components'
import { RootStackParamList } from '@routes'

import { signUpSchema, SignUpSchema } from './signUpSchema'

type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpScreen'
>

export function SignUpScreen({}: SignUpScreenProps) {
  const { control, formState, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
    },
  })

  function submitForm(formValues: SignUpSchema) {
    console.log({ formValues })
    // navigation.replace('SuccessScreen', {
    //   title: 'Sua conta foi criada com sucesso!',
    //   description: 'Agora é só fazer login na nossa plataforma',
    //   icon: {
    //     name: 'checkRound',
    //     color: 'success',
    //   },
    // })
  }

  return (
    <Screen canGoBack={true} scrollable={true}>
      <Text preset='headingLarge' marginBottom='s32'>
        Criar uma conta
      </Text>

      <FormTextInput
        control={control}
        name='username'
        label='Seu username'
        placeholder='@'
        boxProps={{ marginBottom: 's20' }}
      />

      <FormTextInput
        control={control}
        name='fullName'
        label='Nome completo'
        placeholder='Digite seu nome completo'
        boxProps={{ marginBottom: 's20' }}
        autoCapitalize='words'
      />

      <FormTextInput
        control={control}
        name='email'
        label='Email'
        placeholder='Digite seu email'
        boxProps={{ marginBottom: 's20' }}
        keyboardType='email-address'
      />

      <FormPasswordInput
        control={control}
        name='password'
        label='Senha'
        placeholder='Digite sua senha'
      />

      <Button
        title='Criar conta'
        disabled={!formState.isValid}
        marginBottom='s16'
        marginTop='s20'
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  )
}
