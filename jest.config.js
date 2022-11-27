module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["jest-expect-message"],
  collectCoverage: false,
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ["<rootDir>/src/store/modules/**/*.(actions|getters).js", "<rootDir>/src/components/**/*.vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/tests/unit/**/*.spec.(js|jsx|ts|tsx)", "**/__tests__/*.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  reporters: [
    "default", "jest-sonar",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./tests/reports/test-results.html",
        includeFailureMsg: true
      }
    ]
  ],
  coverageReporters: ["text", "html", "cobertura", "lcov", "json-summary"]
}
