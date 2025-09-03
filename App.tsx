import { ThemeProvider } from '@shopify/restyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Toast } from '@components'
import { Router } from '@routes'
import { theme } from '@theme'

/*
  DO NOT SHORTHAND THESE IMPORTS, imports of '@Services' is NOT ALLOWED on App.tsx
* */
import { AuthCredentialsProvider } from './src/services/authCredentials/Providers/AuthCredentialsProvider'
import { MMKVStorage } from './src/services/storage/implementation/MMKVStorage'
import { initializeStorage } from './src/services/storage/storage'
import { ToastProvider } from './src/services/toast/Providers/ToastProvider'

initializeStorage(MMKVStorage)

const queryClient = new QueryClient()

function App() {
  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
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
