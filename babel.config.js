module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './app/components',
          '@features': './app/features',
          '@storage': './app/local_storage',
          '@styles': './app/styles',
          '@redux': './app/redux',
          '@resources': './resources',
          '@hooks': ['./app/hooks'],
        },
      },
    ],
    // 'react-native-reanimated/plugin',
  ],
};
