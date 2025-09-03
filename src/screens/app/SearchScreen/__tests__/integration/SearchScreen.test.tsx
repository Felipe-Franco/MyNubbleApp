import { fireEvent } from '@testing-library/react-native'

import { AppStack } from '@routes'
import { authCredentialsStorage } from '@services'
import { mockUtils, server, userMocks } from '@test'

import { renderScreen, screen } from 'test-utils'

beforeAll(() => {
  server.listen()

  jest
    .spyOn(authCredentialsStorage, 'get')
    .mockResolvedValue(mockUtils.mateusAuthCredentials)
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
  jest.resetAllMocks()
})

describe('integration: SearchScreen', () => {
  test('Search flow', async () => {
    renderScreen(<AppStack initialRouteName='SearchScreen' />)

    const inputText = screen.getByPlaceholderText(/digite sua busca/i)
    expect(inputText).toBeTruthy()
    fireEvent.changeText(inputText, 'mar')

    const user1 = await screen.findByText(userMocks.user1.username)
    expect(user1).toBeTruthy()

    const user2 = await screen.findByText(userMocks.user2.username)
    expect(user2).toBeTruthy()

    fireEvent.press(user1)

    const userFullName = await screen.findByText(userMocks.user1.full_name)
    expect(userFullName).toBeTruthy()
  })
})
