// ESLint flat config. Any rule set to "error" fails the build in CI.
export default [
  {
    ignores: ["_site/**", "node_modules/**"],
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        console: "readonly",
      },
    },
    rules: {
      semi: ["error", "always"],
      eqeqeq: ["error", "always"],
      "no-undef": "error",
      "no-unused-vars": "warn",
      "no-var": "error",
      "prefer-const": "error",
    },
  },
];
