import { AuthCredentials } from '@domain'

export const mockedAuthCredentials: AuthCredentials = {
  token: 'access-token',
  tokenExpiresAt: '2025-07-17T06:28:44.380+00:00',
  refreshToken: 'refresh-token',
  user: {
    id: 2,
    firstName: 'Maria',
    lastName: 'Julia',
    username: 'mariajulia',
    email: 'mariajulia@coffstack.com',
    profileUrl: 'fake-url',
    isOnline: false,
    fullName: 'Maria Julia',
  },
}
