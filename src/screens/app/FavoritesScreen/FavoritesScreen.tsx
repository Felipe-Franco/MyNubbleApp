import { Image, ListRenderItemInfo, StyleSheet } from 'react-native'

import { InfinityScrollList, Screen } from '@components'
import { PostReaction, postReactionService } from '@domain'
import { QueryKeys } from '@infra'
import { AppTabScreenProps } from '@routes'

type FavoritesScreenProps = AppTabScreenProps<'FavoritesScreen'>

export function FavoritesScreen({}: FavoritesScreenProps) {
  function renderItem({ item }: ListRenderItemInfo<PostReaction>) {
    return <Image source={{ uri: item.post.imageURL }} style={styles.image} />
  }

  return (
    <Screen style={styles.screenContainer}>
      <InfinityScrollList
        renderItem={renderItem}
        queryKey={QueryKeys.FavoriteList}
        getList={(page) => postReactionService.getMyReactions('like', page)}
        emptyMessage='Você ainda não favoritou nenhum item'
        errorMessage='Não foi possível carregar seus favoritor 😢😢😢'
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
  image: {
    width: 300,
    height: 300,
  },
})
