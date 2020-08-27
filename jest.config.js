module.exports = {
  rootDir: process.cwd(),
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'out/coverage',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts']
}
