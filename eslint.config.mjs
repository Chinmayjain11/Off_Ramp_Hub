import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        ...globals.node
      }
    },
    rules: {
      "no-unused-vars": ["warn", {
        "vars": "all",
        "args": "after-used"
      }],
      "no-undef": "warn"
    }
  },
  {
    ignores: ["node_modules/", "reports/", "dist/"]
  }
];