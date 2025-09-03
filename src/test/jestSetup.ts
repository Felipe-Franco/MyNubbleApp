import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

import { inMemoryStorage } from '../services/storage/jest/inMemoryStorage'
import { initializeStorage } from '../services/storage/storage'

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

initializeStorage(inMemoryStorage)
