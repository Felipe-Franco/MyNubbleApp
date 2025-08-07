import { useNavigation } from '@react-navigation/native'

import { Box, Text } from '@components'
import { Post } from '@domain'

type PostBottomProps = Pick<Post, 'author' | 'text' | 'commentCount' | 'id'>

export function PostBottom({
  author,
  text,
  commentCount,
  id,
}: PostBottomProps) {
  const commentText = getCommentText(commentCount)
  const navigation = useNavigation()

  function navigateToPostCommentScreen() {
    navigation.navigate('PostCommentScreen', {
      postId: id,
      postAuthorId: author.id,
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
      {commentText && (
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
