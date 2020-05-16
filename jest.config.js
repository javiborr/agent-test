module.exports = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(react-native|smart-webcomponents|react-native-button)/)']
}
