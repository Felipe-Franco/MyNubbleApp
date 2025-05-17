import { useEffect, useState } from 'react'

import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'

import { Page } from '@types'

interface UsePaginatedListResult<TData> {
  list: TData[]
  isError: boolean
  isLoading: boolean
  refresh: () => void
  fetchNextPage: () => void
  hasNextPage: boolean
}

export function usePaginatedList<Data>(
  queryKey: QueryKey,
  getList: (page: number) => Promise<Page<Data>>,
): UsePaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([])

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => getList(pageParam),
    initialPageParam: 1,
    getNextPageParam: ({ meta }) =>
      meta.hasNextPage ? meta.currentPage + 1 : null,
  })

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data]
      }, [])

      setList(newList)
    }
  }, [query.data])

  return {
    list,
    isLoading: query.isLoading,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    refresh: query.refetch,
  }
}
