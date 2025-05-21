import { Button, Screen } from '@components'
import { useAuthSignOut } from '@domain'
import { AppScreenProps } from '@routes'

type SettingsScreenProps = AppScreenProps<'SettingsScreen'>

export function SettingsScreen({}: SettingsScreenProps) {
  const { signOut } = useAuthSignOut()

  function handleSignOut() {
    signOut()
  }

  return (
    <Screen canGoBack={true} title='Configurações'>
      <Button title='Sair da conta' onPress={handleSignOut} />
    </Screen>
  )
}
