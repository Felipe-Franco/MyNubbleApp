import { useNavigation } from '@react-navigation/native'

import { Box, Text } from '@components'
import { Post } from '@domain'

type PostBottomProps = {
  post: Post
  hideCommentActions: boolean
}

export function PostBottom({ post, hideCommentActions }: PostBottomProps) {
  const commentText = getCommentText(post.commentCount)
  const navigation = useNavigation()

  function navigateToPostCommentScreen() {
    navigation.navigate('PostCommentScreen', {
      postId: post.id,
      postAuthorId: post.author.id,
      title: 'Comentários',
    })
  }

  return (
    <Box marginTop='s16'>
      <Text preset='paragraphMedium' bold={true}>
        {post.author.fullName}
      </Text>
      <Text preset='paragraphMedium' color='gray1'>
        {post.text}
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
