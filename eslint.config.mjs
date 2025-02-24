let newUser; 
let id_user; 
let deleteUser; 

function createUser(userData) {
    newUser = userData;
    console.log("Создан новый пользователь:", newUser);
}

function removeUser(id) {
    id_user = id;
    deleteUser = true; 
    console.log("Пользователь удален с ID:", id_user);
}

createUser({ name: "Макеева Екатерина" });
removeUser(123);

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
    },
  },
];
