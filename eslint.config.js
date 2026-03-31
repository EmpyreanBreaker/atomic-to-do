import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: latest,
      globals: {
        ...globals.browser,
      },
    },
    linterOptions: { noInlineConfig: true },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      eqeqeq: "on",
      curly: "error",
      "no-unused-expressions": "error",
    },
  },
]);
