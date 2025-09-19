import { RadioButtonSelector, Screen } from '@components'
import { useSettingsService, useThemePreference } from '@services'

type ThemePreference = 'dark' | 'light' | 'system'

type Option = {
  label: string
  themePreference: ThemePreference
  description?: string
}

const options: Option[] = [
  {
    label: 'Ativado',
    themePreference: 'dark',
  },
  {
    label: 'Desativado',
    themePreference: 'light',
  },
  {
    label: 'Padrão do sistema',
    themePreference: 'system',
    description: 'A aparência será a mesma que você configurar no seu sistema',
  },
]

export function DarkModeScreen() {
  const themePreference = useThemePreference()
  const { setThemePreference } = useSettingsService()

  const selectedOption = options.find(
    (option) => option.themePreference === themePreference,
  )

  function onSelectOption(option: Option) {
    setThemePreference(option.themePreference)
  }

  return (
    <Screen canGoBack={true} title='Modo escuro'>
      <RadioButtonSelector
        selectedItem={selectedOption}
        items={options}
        onSelect={onSelectOption}
        valueKey='themePreference'
        labelKey='label'
        descriptionKey='description'
      />
    </Screen>
  )
}
