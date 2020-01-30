module.exports = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  testPathIgnorePatterns: ['<rootDir>/dist/']
};
