import { waitFor } from '@testing-library/react-native'

import { usePaginatedList } from '@infra'
import { MetaDataPage, Page } from '@types'

import { renderHook } from 'test-utils'

const page1 = ['item1', 'item2', 'item3']
const page2 = ['item4', 'item5', 'item6']

function getList(page: number): Promise<Page<string>> {
  const data = page === 1 ? page1 : page2

  const metaDataPage: MetaDataPage = {
    currentPage: page,
    firstPage: 1,
    lastPage: 2,
    perPage: 3,
    hasNextPage: page === 1,
    hasPreviousPage: page === 2,
    total: 6,
  }

  return Promise.resolve({ meta: metaDataPage, data: data })
}

const mockedGetList = jest.fn(getList)

describe('usePaginatedList', () => {
  it('return all pages together and stops fetching if there are no more page', async () => {
    const { result } = renderHook(() =>
      usePaginatedList(['key'], mockedGetList),
    )

    await waitFor(() => expect(result.current.list).toStrictEqual(page1))

    result.current.fetchNextPage()
    await waitFor(() =>
      expect(result.current.list).toStrictEqual([...page1, ...page2]),
    )

    result.current.fetchNextPage()
    await waitFor(() => expect(mockedGetList).toHaveBeenCalledTimes(2))
  })
})
