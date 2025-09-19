import { useEffect } from 'react'

import { ThemeProvider } from '@shopify/restyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Toast } from '@components'
import { useAppColorSchemeSetup } from '@hooks'
import { Router } from '@routes'
import { darkTheme, lightTheme } from '@theme'

/*
  DO NOT SHORTHAND THESE IMPORTS, imports of '@Services' is NOT ALLOWED on App.tsx
* */
import { AuthCredentialsProvider } from './src/services/authCredentials/Providers/AuthCredentialsProvider'
import { settingsService } from './src/services/settings/settingsService'
import { useAppColorScheme } from './src/services/settings/useSettings'
import { MMKVStorage } from './src/services/storage/implementation/MMKVStorage'
import { initializeStorage } from './src/services/storage/storage'
import { ToastProvider } from './src/services/toast/Providers/ToastProvider'

initializeStorage(MMKVStorage)

const queryClient = new QueryClient()

function App() {
  const appColorScheme = useAppColorScheme()
  useAppColorSchemeSetup()

  useEffect(() => {
    settingsService.handleStatusBar(appColorScheme)
  }, [appColorScheme])

  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider
            theme={appColorScheme === 'dark' ? darkTheme : lightTheme}
          >
            <ToastProvider>
              <Router />
              <Toast />
            </ToastProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  )
}

export default App
