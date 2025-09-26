import { ActivityIndicator, Box, Button, Text } from '@components'

export interface EmptyListProps {
  loading: boolean
  error: boolean
  refetch: () => void
  emptyMessage?: string
  errorMessage?: string
}

export function EmptyList({
  loading,
  error,
  refetch,
  emptyMessage = 'Nada para ver aqui 😢',
  errorMessage = 'Não foi possível carregar a página 😢😢',
}: EmptyListProps) {
  let component = (
    <Text preset='paragraphMedium' bold={true}>
      {emptyMessage}
    </Text>
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
