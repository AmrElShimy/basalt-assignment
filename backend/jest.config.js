/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
        '^@/graphql/(.*)$': '<rootDir>/src/graphql/$1',
        '^@/models/(.*)$': '<rootDir>/src/models/$1',
        '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    },
}
