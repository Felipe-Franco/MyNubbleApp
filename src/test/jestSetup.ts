import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

import { inMemoryStorage } from '../services/storage/jest/inMemoryStorage'
import { initializeStorage } from '../services/storage/storage'

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('@react-native-camera-roll/camera-roll', () => ({
  CameraRoll: {
    getPhotos: jest.fn(async () => ({
      edges: [
        { node: { image: { uri: 'image-1' } } },
        { node: { image: { uri: 'image-2' } } },
        { node: { image: { uri: 'image-3' } } },
      ],
    })),
  },
}))

jest.mock('../services/permission/permissionService', () => ({
  permissionService: {
    request: jest.fn(),
    check: jest.fn(),
  },
}))

jest.mock('expo-image-manipulator', () => ({
  manipulateAsync: jest.fn(),
}))

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValue(() => Promise.resolve()),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: { source: 0 },
      brand: { source: 0 },
    }),
  }
})

initializeStorage(inMemoryStorage)
