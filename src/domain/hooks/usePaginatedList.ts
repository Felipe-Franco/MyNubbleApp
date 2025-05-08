import { useEffect, useState } from 'react'

import { Page } from '@types'

export function usePaginatedList<Data>(
  getList: (page: number) => Promise<Page<Data>>,
) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataList, setDataList] = useState<Data[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  async function fetchInitialData() {
    try {
      setLoading(true)
      setError(null)

      const { data, meta } = await getList(1)
      setDataList(data)

      if (meta.hasNextPage) {
        setHasNextPage(true)
        setPage(2)
      } else {
        setHasNextPage(false)
      }
    } catch (e: unknown) {
      setError('Erro fetch initial data')
    } finally {
      setLoading(false)
    }
  }

  async function fetchNextPage() {
    if (loading || !hasNextPage) return

    try {
      setLoading(true)
      setError(null)

      const { data, meta } = await getList(page)
      setDataList((prev) => [...prev, ...data])

      if (meta.hasNextPage) {
        setPage((prev) => prev + 1)
        setHasNextPage(true)
      } else {
        setHasNextPage(false)
      }
    } catch (e: unknown) {
      setError('Erro fetch next page')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    dataList,
    loading,
    error,
    hasNextPage,
    refresh: fetchInitialData,
    fetchNextPage,
  }
}
