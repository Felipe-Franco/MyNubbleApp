import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'

import { Page } from '@types'

export interface UsePaginatedListResult<T> {
  list: T[]
  isError: boolean
  isLoading: boolean
  refresh: () => void
  fetchNextPage: () => void
  hasNextPage: boolean
}

type PaginatedListOptions = {
  enabled?: boolean
  staleTime?: number
}

export const usePaginatedList = <T>(
  queryKey: QueryKey,
  getList: (page: number) => Promise<Page<T>>,
  options?: PaginatedListOptions,
): UsePaginatedListResult<T> => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) => getList(pageParam),
      initialPageParam: 1,
      getNextPageParam: ({ meta }) =>
        meta.hasNextPage ? meta.currentPage + 1 : undefined,
      staleTime: options?.staleTime,
      enabled: options?.enabled,
    })

  const list = data?.pages.flatMap((page) => page.data) || []

  return {
    list,
    isError,
    isLoading,
    refresh: refetch,
    fetchNextPage,
    hasNextPage: hasNextPage,
  }
}
