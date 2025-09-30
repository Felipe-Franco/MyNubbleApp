import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'

import { Box, PostItem, Screen } from '@components'
import { PostComment, usePostCommentList, usePostGetById } from '@domain'
import { useAppSafeArea } from '@hooks'
import { AppScreenProps } from '@routes'
import { useAuthCredentials } from '@services'

import { EmptyList } from '../../../components/InfinityScrollList/components/EmptyList'

import { PostCommentBottom } from './components/PostCommentBottom'
import { PostCommentItem } from './components/PostCommentItem'
import { PostCommentTextMessage } from './components/PostCommentTextMessage'

type PostCommentScreenProps = AppScreenProps<'PostCommentScreen'>

export function PostCommentScreen({ route }: PostCommentScreenProps) {
  const {
    postId,
    postAuthorId,
    title = 'Comentários',
    showPost = false,
  } = route.params
  const { bottom } = useAppSafeArea()
  const { userId } = useAuthCredentials()

  const {
    list: postCommentList,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    refresh,
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
        contentContainerStyle={[
          {
            paddingBottom: bottom,
          },
          postCommentList.length === 0 ? styles.flexContainer : null,
        ]}
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
        ListEmptyComponent={
          <EmptyList
            emptyTitle='Esse post ainda não possui nenhum comentário'
            errorMessage='Erro ao carregar os comentários'
            loading={isLoading}
            error={isError}
            refetch={refresh}
          />
        }
      />

      <Box paddingHorizontal='s24'>
        <PostCommentTextMessage postId={postId} />
      </Box>
    </Screen>
  )
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
})
