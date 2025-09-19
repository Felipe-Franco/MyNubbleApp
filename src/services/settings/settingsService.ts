import { Appearance } from 'react-native'

import { ColorSchemeName } from '@theme'

import { AppColorScheme, ThemePreference } from './settingsTypes'

function onThemePreferenceChange(
  themePreference: ThemePreference,
): AppColorScheme {
  if (themePreference === 'system') {
    const colorScheme = Appearance.getColorScheme()
    return colorScheme ? colorScheme : 'light'
  }

  return themePreference
}

function onSytemChange(
  color: ColorSchemeName,
  themePreference: ThemePreference,
): AppColorScheme | null {
  if (themePreference === 'system') {
    return color ? color : 'light'
  }

  return null
}

export const settingsService = {
  onThemePreferenceChange,
  onSytemChange,
}
