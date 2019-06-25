module.exports = function(wallaby) {
  return {
    files: [
      "tsconfig.json",
      "data/*.json",
      "app/**/*.ts",
      "!app/**/*.spec.ts"
    ],
    tests: [
      "app/**/*.spec.ts",
      "app/**/*.spec.js"
    ],
    env: {
      type: "node",
    },
    compilers: {
      "**/*.ts": wallaby.compilers.typeScript({
        typescript: require("typescript")
      })
    },

    testFramework: "jest",
    debug: true
  };
};
