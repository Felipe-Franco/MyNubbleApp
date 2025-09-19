import { useEffect } from 'react'
import { Appearance } from 'react-native'

import { useSettingsService } from '@services'

export function useAppColorSchemeSetup() {
  const { onSystemChange } = useSettingsService()

  useEffect(() => {
    onSystemChange(Appearance.getColorScheme())
  }, [onSystemChange])

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      onSystemChange(colorScheme)
    })

    return subscription.remove
  }, [onSystemChange])
}
