module.exports = {
  roots: ['__tests__'],
  setupFiles: ['<rootDir>/node_modules/react-native/jest/setup.js'],
  testEnvironment: '<rootDir>/node_modules/react-native/jest/react-native-env.js',
  moduleFileExtensions: ['android.js', 'ios.js', 'native.js', 'js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules', '<rootDir>/node_modules', '../../node_modules'],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/node_modules/react-native',
    '^react-native/(.*)$': '<rootDir>/node_modules/react-native/$1',
    '^@divyaasirwad/design-system$': '<rootDir>/../design-system/src/index',
    '^@divyaasirwad/shared$': '<rootDir>/../shared/src/index',
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@react-navigation/.*|react-native-.*|@divyaasirwad/.*)',
  ],
};
