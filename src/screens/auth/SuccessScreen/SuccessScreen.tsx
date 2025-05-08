import { useNavigation } from '@react-navigation/native'

import { Button, Icon, Screen, Text } from '@components'
import { AuthScreenProps } from '@routes'

type SuccessScreenProps = AuthScreenProps<'SuccessScreen'>

export function SuccessScreen({ route }: SuccessScreenProps) {
  const { title, description, icon } = route.params
  const navigation = useNavigation()

  function goBackToBegin() {
    navigation.goBack()
  }

  return (
    <Screen>
      <Icon name={icon.name} color={icon.color} />
      <Text preset='headingLarge' marginTop='s24'>
        {title}
      </Text>
      <Text preset='paragraphLarge' marginTop='s16'>
        {description}
      </Text>
      <Button
        title='Voltar ao inicio'
        marginTop='s40'
        onPress={goBackToBegin}
      />
    </Screen>
  )
}
