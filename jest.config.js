const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupJest.js'],
  coveragePathIgnorePatterns: [
    '/node_modules',
    '/src/context',
    '/src/hooks',
    '/src/utils',
    '/src/graphql',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 88,
      lines: 90,
      statements: 90,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
