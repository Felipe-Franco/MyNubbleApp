import { useRef } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
} from 'react-native'

import { useScrollToTop } from '@react-navigation/native'

import { PostItem, Screen } from '@components'
import { Post, usePostList } from '@domain'
import { AppTabScreenProps } from '@routes'

import { HomeEmpty } from './components/HomeEmpty'
import { HomeHeader } from './components/HomeHeader'

type HomeScreenProps = AppTabScreenProps<'HomeScreen'>

export function HomeScreen({}: HomeScreenProps) {
  const flatListRef = useRef<FlatList>(null)
  const {
    dataList: postList,
    loading,
    error,
    refresh,
    fetchNextPage,
  } = usePostList()

  useScrollToTop(flatListRef)

  function renderItem({ item }: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />
  }

  function keyExtractor(post: Post) {
    return post.id.toString()
  }

  return (
    <Screen style={styles.screenContainer}>
      <FlatList
        ref={flatListRef}
        data={postList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        refreshing={loading}
        contentContainerStyle={[
          postList.length === 0 ? styles.flexContainer : null,
        ]}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        ListHeaderComponent={HomeHeader}
        ListEmptyComponent={
          <HomeEmpty loading={loading} error={error} refetch={refresh} />
        }
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
})
