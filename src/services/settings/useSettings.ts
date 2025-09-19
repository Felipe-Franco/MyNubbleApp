import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '../storage/storage'

import { settingsService } from './settingsService'
import { AppColorScheme, SettingsStore, ThemePreference } from './settingsTypes'

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      appColorScheme: 'light',
      themePreference: 'system',

      onSystemChange: (colorSchemeName) => {
        const updatedAppTheme = settingsService.onSytemChange(
          colorSchemeName,
          get().themePreference,
        )

        if (updatedAppTheme) {
          set({ appColorScheme: updatedAppTheme })
        }
      },

      setThemePreference: (newThemePreference) => {
        const updatedAppTheme =
          settingsService.onThemePreferenceChange(newThemePreference)

        if (updatedAppTheme) {
          set({
            appColorScheme: updatedAppTheme,
            themePreference: newThemePreference,
          })
        }
      },
    }),
    { name: '@Settings', storage: storage },
  ),
)

export function useAppColorScheme(): AppColorScheme {
  const appTheme = useSettingsStore((state) => state.appColorScheme)
  return appTheme
}

export function useThemePreference(): ThemePreference {
  const themePreference = useSettingsStore((state) => state.themePreference)
  return themePreference
}

export function useSettingsService() {
  const setThemePreference = useSettingsStore(
    (state) => state.setThemePreference,
  )
  const onSystemChange = useSettingsStore((state) => state.onSystemChange)

  return {
    setThemePreference,
    onSystemChange,
  }
}
