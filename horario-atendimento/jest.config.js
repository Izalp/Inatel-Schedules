module.exports = {
    testEnvironment: 'node',
    transform: {
        "^.+\\.(js|ts)$": "babel-jest"
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testPathIgnorePatterns: ['/node_modules/'],
};
