import { ActivityIndicator, Box, Button, Text } from '@components'

export interface EmptyListProps {
  loading: boolean
  error: boolean
  refetch: () => void
  emptyTitle?: string
  emptyMessage?: string
  errorMessage?: string
}

export function EmptyList({
  loading,
  error,
  refetch,
  emptyTitle = 'Nada para ver aqui 😢',
  emptyMessage = 'Talvez o que você procura seja a resposta para a vida, o universo e tudo mais?\nSendo assim: 42',
  errorMessage = 'Não foi possível carregar a página 😢😢',
}: EmptyListProps) {
  let component = (
    <>
      <Text preset='paragraphMedium' bold={true} textAlign='center'>
        {emptyTitle}
      </Text>
      <Text
        preset='paragraphSmall'
        semiBold={true}
        textAlign='center'
        marginTop='s12'
      >
        {emptyMessage}
      </Text>
    </>
  )

  if (loading) {
    component = <ActivityIndicator color='primary' />
  }

  if (error) {
    component = (
      <>
        <Text preset='paragraphMedium' bold={true}>
          {errorMessage}
        </Text>
        <Button
          title='Recarregar'
          preset='outline'
          onPress={refetch}
          marginTop='s12'
        />
      </>
    )
  }

  return (
    <Box flex={1} justifyContent='center' alignItems='center'>
      {component}
    </Box>
  )
}
