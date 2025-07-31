module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@domain': './src/domain',
          '@hooks': './src/hooks',
          '@infra': './src/infra',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@services': './src/services',
          '@test': './src/test',
          '@theme': './src/theme',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
}
