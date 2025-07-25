import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAppSafeArea } from '@hooks'
import { theme } from '@theme'

import { renderHook } from 'test-utils'

jest.mock('react-native-safe-area-context')
const mockedUseSafeAreaInsets = jest.mocked(useSafeAreaInsets)

describe('useAppSafeArea', () => {
  test('when the safe area is less than the minimum requirement, it returns the minimum requirement', () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(
      () =>
        ({
          top: 4,
          bottom: 4,
        }) as EdgeInsets,
    )

    const { result } = renderHook(() => useAppSafeArea())
    expect(result.current.top).toEqual(theme.spacing.s20)
    expect(result.current.bottom).toEqual(theme.spacing.s20)
  })

  test('when the safe are is greater than de minimum requirement, it return the safe area', () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(
      () =>
        ({
          top: 30,
          bottom: 30,
        }) as EdgeInsets,
    )

    const { result } = renderHook(() => useAppSafeArea())
    expect(result.current.top).toEqual(30)
    expect(result.current.bottom).toEqual(30)
  })
})
