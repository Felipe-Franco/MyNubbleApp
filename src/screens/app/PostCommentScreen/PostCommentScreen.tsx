import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'

import { Screen } from '@components'
import { PostComment, usePostCommentList } from '@domain'
import { useAppSafeArea } from '@hooks'
import { AppScreenProps } from '@routes'
import { useAuthCredentials } from '@services'

import { PostCommentBottom } from './components/PostCommentBottom'
import { PostCommentItem } from './components/PostCommentItem'
import { PostCommentTextMessage } from './components/PostCommentTextMessage'

type PostCommentScreenProps = AppScreenProps<'PostCommentScreen'>

export function PostCommentScreen({ route }: PostCommentScreenProps) {
  const { postId, postAuthorId } = route.params
  const { bottom } = useAppSafeArea()
  const { userId } = useAuthCredentials()

  const {
    list: postCommentList,
    hasNextPage,
    fetchNextPage,
  } = usePostCommentList(postId)

  function renderItem({ item }: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        postId={postId}
        postComment={item}
        postAuthorId={postAuthorId}
        userId={userId}
      />
    )
  }

  function keyExtractor(comment: PostComment) {
    return comment.id.toString()
  }

  return (
    <Screen canGoBack={true} title='Comentários' style={styles.screenContainer}>
      <FlatList
        data={postCommentList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom }}
        ListFooterComponent={
          <PostCommentBottom
            onPress={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        }
      />

      <PostCommentTextMessage postId={postId} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
})
