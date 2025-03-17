import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'eqeqeq': ['error', 'always'], // Использует строгое равенство
      'curly': 'error', // Обязывает использовать фигурные скобки
      'semi': ['error', 'always'], // Обязывает ставить точку с запятой
      'quotes': ['error', 'single'], // Используйет одинарные кавычки
      'no-console': 'warn', // Предупреждает о использовании console.log
      'consistent-return': 'error', // Обязывает возвращать значение из всех функций
    },
  },
];
