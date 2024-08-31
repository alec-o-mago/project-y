import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',               // Use ts-jest preset for TypeScript support
  testEnvironment: 'node',          // Set the test environment to Node.js
  testMatch: ['**/tests/**/*.test.ts'], // Look for test files with the .test.ts extension
  moduleFileExtensions: ['ts', 'js'],   // Allow Jest to handle .ts and .js files
  transform: {
    '^.+\\.ts$': 'ts-jest',         // Use ts-jest to transform TypeScript files
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,       // Improves performance by skipping type-checking
    },
  },
  setupFilesAfterEnv: ['./jest.setup.ts'], // Optionally add setup files
  coverageDirectory: './coverage',  // Output coverage reports to the coverage directory
  collectCoverageFrom: [
    'src/**/*.ts',                 // Collect coverage from TypeScript files in src
    '!src/**/*.d.ts',              // Exclude type declaration files
  ],
  coverageReporters: ['text', 'lcov'],  // Generate text and lcov coverage reports
  clearMocks: true,                // Automatically clear mock calls and instances between tests
};

export default config;
