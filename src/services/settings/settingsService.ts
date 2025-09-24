import { Appearance, Platform, StatusBar } from 'react-native'

import {
  hide as hideBootSplash,
  isVisible as isVisibleBootSplash,
} from 'react-native-bootsplash'

import { colors, ColorSchemeName } from '@theme'

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

function onSystemChange(
  color: ColorSchemeName,
  themePreference: ThemePreference,
): AppColorScheme | null {
  if (themePreference === 'system') {
    return color ? color : 'light'
  }

  return null
}

function handleStatusBar(appColorScheme: AppColorScheme) {
  const barStyle = appColorScheme === 'dark' ? 'light-content' : 'dark-content'
  StatusBar.setBarStyle(barStyle, true)

  if (Platform.OS === 'android') {
    const background =
      appColorScheme === 'dark'
        ? colors.palette.grayBlack
        : colors.palette.grayWhite

    StatusBar.setBackgroundColor(background, true)
  }
}

async function hideSplashScreen() {
  try {
    const visible = await isVisibleBootSplash()

    if (visible) {
      hideBootSplash({ fade: true })
    }
  } finally {
    hideBootSplash()
  }
}

export const settingsService = {
  onThemePreferenceChange,
  onSystemChange,
  handleStatusBar,
  hideSplashScreen,
}
