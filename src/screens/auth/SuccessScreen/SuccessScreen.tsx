import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Button, Icon, Screen, Text } from '@components'
import { RootStackParamList } from '@routes'

type SuccessScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SuccessScreen'
>

export function SuccessScreen({ navigation, route }: SuccessScreenProps) {
  const params = route.params

  function goBackToBegin() {
    navigation.goBack()
  }

  return (
    <Screen>
      <Icon name={params.icon.name} color={params.icon.color} />
      <Text preset='headingLarge' marginTop='s24'>
        {params.title}
      </Text>
      <Text preset='paragraphLarge' marginTop='s16'>
        {params.description}
      </Text>
      <Button
        title='Voltar ao inicio'
        marginTop='s40'
        onPress={goBackToBegin}
      />
    </Screen>
  )
}
