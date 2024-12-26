module.exports = {
    testEnvironment: 'node', // Use Node.js environment for backend testing
    verbose: true, // Show detailed test results
    setupFilesAfterEnv: ['./jest.setup.js'], // Run setup file for global hooks
    testMatch: ['**/tests/**/*.test.js'], // Look for test files in 'tests' directory
    collectCoverage: true, // Enable code coverage reporting
    coverageDirectory: 'coverage', // Directory for coverage reports
    collectCoverageFrom: [
        '**/*.js', // Include all JS files
        '!node_modules/**', // Exclude node_modules
        '!**/jest.config.js', // Exclude Jest configuration
        '!**/server.js' // Exclude main entry point
    ],
};
