import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  testMatch: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/../__tests__/setup/prisma-mock.ts'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/../src/$1',
    '~tests/(.*)': '<rootDir>/../__tests__/$1',
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/test/**',
  ],
  clearMocks: true,
}

export default config
