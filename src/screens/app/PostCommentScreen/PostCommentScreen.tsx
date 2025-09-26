import { FlatList, ListRenderItemInfo } from 'react-native'

import { Box, PostItem, Screen } from '@components'
import { PostComment, usePostCommentList, usePostGetById } from '@domain'
import { useAppSafeArea } from '@hooks'
import { AppScreenProps } from '@routes'
import { useAuthCredentials } from '@services'

import { PostCommentBottom } from './components/PostCommentBottom'
import { PostCommentItem } from './components/PostCommentItem'
import { PostCommentTextMessage } from './components/PostCommentTextMessage'

type PostCommentScreenProps = AppScreenProps<'PostCommentScreen'>

export function PostCommentScreen({ route }: PostCommentScreenProps) {
  const { postId, postAuthorId, title, showPost = false } = route.params
  const { bottom } = useAppSafeArea()
  const { userId } = useAuthCredentials()

  const {
    list: postCommentList,
    hasNextPage,
    fetchNextPage,
  } = usePostCommentList(postId)

  const { post } = usePostGetById(postId, showPost)

  function renderItem({ item }: ListRenderItemInfo<PostComment>) {
    return (
      <Box paddingHorizontal='s24'>
        <PostCommentItem
          postId={postId}
          postComment={item}
          postAuthorId={postAuthorId}
          userId={userId}
        />
      </Box>
    )
  }

  function keyExtractor(comment: PostComment) {
    return comment.id.toString()
  }

  return (
    <Screen canGoBack={true} title={title} flex={1} noPaddingHorizontal={true}>
      <FlatList
        data={postCommentList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom }}
        ListHeaderComponent={
          showPost && !!post ? (
            <PostItem post={post} hideCommentActions={showPost} />
          ) : null
        }
        ListFooterComponent={
          <PostCommentBottom
            onPress={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        }
      />

      <Box paddingHorizontal='s24'>
        <PostCommentTextMessage postId={postId} />
      </Box>
    </Screen>
  )
}
