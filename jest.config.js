module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  // testMatch: ["<rootDir>/src/**/?(*.)test.js"],
  testMatch: ["<rootDir>/src/**/*.test.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/config/**/*.js",
    "!src/**/dbHelper.js",
    "!src/index.js",
    "!src/env.js",
    "!src/__mock__/**/*.js"
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      statements: 96.0,
      branches: 90.0,
      functions: 90.0,
      lines: 96.0
    }
  }
};
