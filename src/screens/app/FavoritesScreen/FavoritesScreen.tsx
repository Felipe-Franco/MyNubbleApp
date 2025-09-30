import { Dimensions, ListRenderItemInfo, StyleSheet } from 'react-native'

import { InfinityScrollList, Screen } from '@components'
import { PostReaction, postReactionService } from '@domain'
import { AppQueryKeys } from '@infra'
import { AppTabScreenProps } from '@routes'

import { FavoriteItem } from './components/FavoriteItem'

type FavoritesScreenProps = AppTabScreenProps<'FavoritesScreen'>

const NUM_COLUMNS = 2
const SCREEN_WIDTH = Dimensions.get('screen').width
const HORIZONTAL_PADDING = 24
const ITEM_MARGIN = 16
const TOTAL_ITEM_MARGIN = (NUM_COLUMNS - 1) * ITEM_MARGIN

const ITEM_WIDTH =
  (SCREEN_WIDTH - TOTAL_ITEM_MARGIN - HORIZONTAL_PADDING * 2) / NUM_COLUMNS

export function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  function renderItem({ item }: ListRenderItemInfo<PostReaction>) {
    return (
      <FavoriteItem
        postReaction={item}
        itemWidth={ITEM_WIDTH}
        onPress={() =>
          navigation.navigate('PostCommentScreen', {
            postId: item.postId,
            postAuthorId: item.author.id,
            title: 'Post',
            showPost: true,
          })
        }
      />
    )
  }

  return (
    <Screen title='Favoritos' style={styles.screenContainer}>
      <InfinityScrollList
        renderItem={renderItem}
        queryKey={AppQueryKeys.GetFavoriteList}
        getList={(page) => postReactionService.getMyReactions('favorite', page)}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={{ columnGap: ITEM_MARGIN }}
        contentContainerStyle={{
          rowGap: ITEM_MARGIN,
          paddingBottom: ITEM_MARGIN,
        }}
        emptyMessage='Você ainda não favoritou nenhum item'
        errorMessage='Não foi possível carregar seus favoritor 😢😢😢'
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingBottom: 0,
  },
})
