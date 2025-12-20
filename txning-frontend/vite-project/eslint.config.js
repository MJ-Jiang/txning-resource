import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  prettierConfig, // ✅ 关闭与 prettier 冲突的 eslint 格式规则

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ✅ 让 prettier 作为 eslint 规则运行（可选，但方便）
      'prettier/prettier': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },
]
