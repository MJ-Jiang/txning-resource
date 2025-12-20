import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // ✅ 关键：启用 JSX
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
    },

    rules: {
      "react/react-in-jsx-scope": "off", // React 17+
      "no-unused-vars": "warn",
      "no-console": "off",

      // hooks 规则
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
