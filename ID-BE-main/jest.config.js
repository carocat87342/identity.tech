module.exports = {
  verbose: false,
  // transform: {
  //   "^.+\\.js$": "js-jest",
  // },
  testMatch: ["**/tests/**/*.js", "**/?(*.)+test.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  rootDir: "./",
  roots: ["<rootDir>/dist/tests", "<rootDir>/dist"],
  collectCoverage: false,
  // collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/**/*.d.ts"],
  collectCoverageFrom: ["<rootDir>/dist/**/*.js"],
  coverageDirectory: "<rootDir>/coverage",
  testEnvironment: "node",
};
