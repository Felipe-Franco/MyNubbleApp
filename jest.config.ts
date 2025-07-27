import type { Config } from 'jest'

const config: Config = {
  preset: 'react-native',
  collectCoverageFrom: [
    'src/{components,utils,hooks,domain,infra}/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'index'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-safe-area-context)/)',
  ],
  moduleDirectories: ['node_modules', './src/test'],
  modulePathIgnorePatterns: ['.*/mockedData/.*'],
  setupFiles: ['./src/test/jestSetup.ts'],
}

export default config
