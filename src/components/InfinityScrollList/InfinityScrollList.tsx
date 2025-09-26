import { useRef } from 'react'
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
} from 'react-native'

import { useScrollToTop } from '@react-navigation/native'

import { QueryKeys, usePaginatedList } from '@infra'
import { Page } from '@types'

import { EmptyList } from './components/EmptyList'

type ItemTConstraints = { id: number | string }

export type InfinityScrollListProps<ItemT extends ItemTConstraints> = {
  queryKey: QueryKeys
  getList: (page: number) => Promise<Page<ItemT>>
  renderItem: FlatListProps<ItemT>['renderItem']
  emptyMessage?: string
  errorMessage?: string
} & Partial<FlatListProps<ItemT>>

export function InfinityScrollList<ItemT extends ItemTConstraints>({
  queryKey,
  getList,
  renderItem,
  emptyMessage,
  errorMessage,
  ...flatListProps
}: InfinityScrollListProps<ItemT>) {
  const flatListRef = useRef<FlatList>(null)

  const { list, isLoading, isError, refresh, fetchNextPage } = usePaginatedList(
    [queryKey],
    getList,
  )

  useScrollToTop(flatListRef)

  function keyExtractor(item: ItemT) {
    return item.id.toString()
  }

  return (
    <FlatList
      ref={flatListRef}
      data={list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.1}
      refreshing={isLoading}
      contentContainerStyle={[list.length === 0 ? styles.flexContainer : null]}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
      ListEmptyComponent={
        <EmptyList
          loading={isLoading}
          error={isError}
          refetch={refresh}
          emptyMessage={emptyMessage}
          errorMessage={errorMessage}
        />
      }
      {...flatListProps}
    />
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
