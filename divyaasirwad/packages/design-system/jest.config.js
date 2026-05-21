/** @type {import('jest').Config} */
module.exports = {
  roots: ['__tests__'],
  setupFiles: ['<rootDir>/node_modules/react-native/jest/setup.js'],
  testEnvironment: '<rootDir>/node_modules/react-native/jest/react-native-env.js',
  moduleFileExtensions: ['android.js', 'ios.js', 'native.js', 'js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules', '<rootDir>/node_modules', '../../node_modules'],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/node_modules/react-native',
    '^react-native/(.*)$': '<rootDir>/node_modules/react-native/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community)/)',
  ],
};
