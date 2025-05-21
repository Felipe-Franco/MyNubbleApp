import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components'
import { useAuthSignIn } from '@domain'
import { AuthScreenProps } from '@routes'
import { useToastService } from '@services'

import { LoginScheme, loginScheme } from './loginScheme'

type LoginScreenProps = AuthScreenProps<'LoginScreen'>

export function LoginScreen({}: LoginScreenProps) {
  const { control, handleSubmit, formState } = useForm<LoginScheme>({
    resolver: zodResolver(loginScheme),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { showToast } = useToastService()
  const navigation = useNavigation()
  const { signIn, isLoading } = useAuthSignIn({
    onError: (e) => {
      showToast({ message: e, type: 'error' })
    },
  })

  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen')
  }

  function navigateToForgotPasswordScreen() {
    navigation.navigate('ForgotPasswordScreen')
  }

  function submitForm(form: LoginScheme) {
    signIn(form)
  }

  return (
    <Screen scrollable={true}>
      <Text preset='headingLarge' marginBottom='s8'>
        Olá!
      </Text>
      <Text preset='paragraphLarge' marginBottom='s48'>
        Digite seu email e senha para entrar
      </Text>

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

      <Text
        onPress={navigateToForgotPasswordScreen}
        preset='paragraphSmall'
        color='primary'
        marginTop='s10'
      >
        Esqueci minha senha
      </Text>

      <Button
        title='Entrar'
        loading={isLoading}
        marginTop='s48'
        onPress={handleSubmit(submitForm)}
        disabled={!formState.isValid}
      />
      <Button
        title='Criar uma conta'
        preset='outline'
        marginTop='s12'
        onPress={navigateToSignUpScreen}
      />
    </Screen>
  )
}
