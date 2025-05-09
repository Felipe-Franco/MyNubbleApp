import { useState } from 'react'

import { ThemeProvider } from '@shopify/restyle'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Toast } from '@components'
import { SignInContext } from '@hooks'
import { Router } from '@routes'
import { ToastProvider } from '@services'
import { theme } from '@theme'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true)

  function signIn() {
    setIsSignedIn(true)
  }

  function signOut() {
    setIsSignedIn(false)
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SignInContext.Provider value={{ isSignedIn, signIn, signOut }}>
          <ToastProvider>
            <Router />
            <Toast />
          </ToastProvider>
        </SignInContext.Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
