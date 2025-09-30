import { ListRenderItemInfo, StyleSheet } from 'react-native'

import { InfinityScrollList, PostItem, Screen } from '@components'
import { Post, postService } from '@domain'
import { AppQueryKeys } from '@infra'
import { AppTabScreenProps } from '@routes'

import { HomeHeader } from './components/HomeHeader'

type HomeScreenProps = AppTabScreenProps<'HomeScreen'>

export function HomeScreen({}: HomeScreenProps) {
  function renderItem({ item }: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />
  }

  return (
    <Screen style={styles.screenContainer}>
      <InfinityScrollList
        renderItem={renderItem}
        queryKey={AppQueryKeys.GetPostList}
        getList={postService.getList}
        emptyMessage='Não há publicações no seu feed!'
        errorMessage='Não foi possível carregar o feed 😢'
        ListHeaderComponent={HomeHeader}
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
})
