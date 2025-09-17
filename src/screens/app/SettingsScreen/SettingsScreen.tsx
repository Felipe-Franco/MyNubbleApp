import { Button, Divider, Screen } from '@components'
import { useAuthSignOut } from '@domain'
import { AppScreenProps } from '@routes'

import { MenuItem } from './components/MenuItem'

type SettingsScreenProps = AppScreenProps<'SettingsScreen'>

export function SettingsScreen({}: SettingsScreenProps) {
  const { signOut } = useAuthSignOut()

  function handleSignOut() {
    signOut()
  }

  return (
    <Screen canGoBack={true} title='Configurações'>
      <MenuItem label='Termos de uso' onPress={() => {}} />
      <Divider />

      <MenuItem label='Política de privacidade' onPress={() => {}} />
      <Divider />

      <MenuItem label='Modo escuro' onPress={() => {}} />

      <Button title='Sair da conta' onPress={handleSignOut} marginTop='s48' />
    </Screen>
  )
}
