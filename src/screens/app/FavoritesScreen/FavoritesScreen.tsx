import { Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'

type FavoritesScreenProps = AppTabScreenProps<'FavoritesScreen'>

export function FavoritesScreen({}: FavoritesScreenProps) {
  return (
    <Screen>
      <Text>Favorite Screen</Text>
    </Screen>
  )
}
