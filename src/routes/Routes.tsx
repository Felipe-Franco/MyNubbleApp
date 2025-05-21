import { NavigationContainer } from '@react-navigation/native'

import { useAuthCredentials } from '@services'

import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'

export function Router() {
  const { authCredentials } = useAuthCredentials()
  const isSignedIn = !!authCredentials

  return (
    <NavigationContainer>
      {isSignedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
