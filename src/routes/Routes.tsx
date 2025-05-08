import { NavigationContainer } from '@react-navigation/native'

import { useIsSignedIn } from '@hooks'

import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'

export function Router() {
  const isSignedIn = useIsSignedIn()

  return (
    <NavigationContainer>
      {isSignedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
