import { Alert, Pressable } from 'react-native'

import { Box, ProfileAvatar, Text } from '@components'
import { PostComment, postCommentService, usePostCommentRemove } from '@domain'
import { useToastService } from '@services'
import { dateUtils } from '@utils'

interface PostCommentItemProps {
  postId: number
  postComment: PostComment
  postAuthorId: number
  userId: number | null
}

export function PostCommentItem({
  postComment,
  postAuthorId,
  postId,
  userId,
}: PostCommentItemProps) {
  const { showToast } = useToastService()
  const { removePostComment } = usePostCommentRemove(postId, {
    onSuccess: () => {
      showToast({
        message: 'Comentário removido com sucesso!',
        position: 'bottom',
      })
    },
  })

  function openRemoveDialog() {
    if (
      postCommentService.isAllowedToDelete(
        postAuthorId,
        postComment.author.id,
        userId,
      )
    ) {
      Alert.alert('Deseja remover o comentário?', 'pressione confirmar', [
        {
          text: 'Confirmar',
          onPress: () => removePostComment({ postCommentId: postComment.id }),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ])
    }
  }

  return (
    <Pressable onLongPress={openRemoveDialog} testID='post-comment-item'>
      <Box flexDirection='row' alignItems='center' marginBottom='s16'>
        <ProfileAvatar profileURL={postComment.author.profileURL} />
        <Box marginLeft='s12' flex={1}>
          <Text preset='paragraphSmall' bold={true}>
            {postComment.author.userName}
          </Text>
          <Text preset='paragraphSmall' color='gray1'>
            {postComment.message} -{' '}
            {dateUtils.formatRelative(postComment.createdAt)}
          </Text>
        </Box>
      </Box>
    </Pressable>
  )
}
