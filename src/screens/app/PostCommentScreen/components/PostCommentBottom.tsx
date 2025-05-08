import { Text } from '@components'

interface PostCommentBottomProps {
  onPress: () => void
  hasNextPage: boolean
}

export function PostCommentBottom({
  onPress,
  hasNextPage,
}: PostCommentBottomProps) {
  if (!hasNextPage) return null

  return (
    <Text color='primary' bold={true} textAlign='center' onPress={onPress}>
      Ver mais
    </Text>
  )
}
