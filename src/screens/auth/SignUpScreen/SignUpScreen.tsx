import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components'
import { useAuthSignUp } from '@domain'
import { AuthScreenProps, AuthStackParamList } from '@routes'

import { SignUpSchema, signUpSchema } from './signUpSchema'

const defaultValues: SignUpSchema = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const successScreenParams: AuthStackParamList['SuccessScreen'] = {
  title: 'Sua conta foi criada com sucesso!',
  description: 'Agora é só fazer login na nossa plataforma',
  icon: {
    name: 'checkRound',
    color: 'success',
  },
}

type SignUpScreenProps = AuthScreenProps<'SignUpScreen'>

export function SignUpScreen({ navigation }: SignUpScreenProps) {
  const { signUp, isLoading } = useAuthSignUp({
    onSuccess: replaceWithSuccessScreen,
  })

  const { control, formState, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues,
  })

  function replaceWithSuccessScreen() {
    navigation.replace('SuccessScreen', successScreenParams)
  }

  function submitForm(signUpForm: SignUpSchema) {
    signUp(signUpForm)
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
        name='firstName'
        label='Nome'
        placeholder='Digite seu nome'
        boxProps={{ marginBottom: 's20' }}
        autoCapitalize='words'
      />

      <FormTextInput
        control={control}
        name='lastName'
        label='Sobrenome'
        placeholder='Digite seu sobrenome'
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
        loading={isLoading}
        disabled={!formState.isValid}
        marginBottom='s16'
        marginTop='s20'
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  )
}
