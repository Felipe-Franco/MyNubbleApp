import { useNavigation } from '@react-navigation/native'

import { Box, Text } from '@components'
import { Post } from '@domain'

type PostBottomProps = Pick<Post, 'author' | 'text' | 'commentCount' | 'id'> & {
  hideCommentActions: boolean
}

export function PostBottom({
  author,
  text,
  commentCount,
  id,
  hideCommentActions,
}: PostBottomProps) {
  const commentText = getCommentText(commentCount)
  const navigation = useNavigation()

  function navigateToPostCommentScreen() {
    navigation.navigate('PostCommentScreen', {
      postId: id,
      postAuthorId: author.id,
      title: 'Comentários',
    })
  }

  return (
    <Box marginTop='s16'>
      <Text preset='paragraphMedium' bold={true}>
        {author.fullName}
      </Text>
      <Text preset='paragraphMedium' color='gray1'>
        {text}
      </Text>
      {commentText && !hideCommentActions && (
        <Text
          preset='paragraphSmall'
          bold={true}
          color='primary'
          marginTop='s8'
          onPress={navigateToPostCommentScreen}
        >
          {commentText}
        </Text>
      )}
    </Box>
  )
}

function getCommentText(commentCount: number) {
  if (commentCount === 0) {
    return null
  } else if (commentCount === 1) {
    return 'ver comentário'
  } else {
    return `ver ${commentCount} comentários`
  }
}
