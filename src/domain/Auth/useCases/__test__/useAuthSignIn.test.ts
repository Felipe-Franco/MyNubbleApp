import { authService, useAuthSignIn } from '@domain'

import { renderHook, waitFor } from 'test-utils'

import { mockedAuthCredentials } from './mockedData/mockedAuthCredentials'

const mockedSaveCredentials = jest.fn()

jest.mock('@services', () => {
  const originalModule = jest.requireActual('@services')
  return {
    ...originalModule,
    useAuthCredentials: () => ({
      saveCredentials: mockedSaveCredentials,
    }),
  }
})

describe('useAuthSignIn', () => {
  it('saves credentials if the sign-in successfully', async () => {
    const mockedOnSuccess = jest.fn()
    const { result } = renderHook(() =>
      useAuthSignIn({ onSuccess: mockedOnSuccess }),
    )
    jest
      .spyOn(authService, 'signIn')
      .mockResolvedValueOnce(mockedAuthCredentials)

    result.current.signIn({
      email: 'mariajulia@coffstack.com',
      password: 'supersecret',
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials)
    expect(mockedOnSuccess).toHaveBeenCalledWith(mockedAuthCredentials)
  })

  it('calls the onError function with a message if sign-in fails', async () => {
    const mockedOnError = jest.fn()
    const errorMessage = 'invalid user'
    const { result } = renderHook(() =>
      useAuthSignIn({ onError: mockedOnError }),
    )

    jest
      .spyOn(authService, 'signIn')
      .mockRejectedValueOnce(new Error(errorMessage))

    result.current.signIn({
      email: 'mariajulia@coffstack.com',
      password: 'supersecret',
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockedOnError).toHaveBeenCalledWith(errorMessage)
  })
})
