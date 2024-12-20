"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleDirectories: ['node_modules', '<rootDir>'],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map