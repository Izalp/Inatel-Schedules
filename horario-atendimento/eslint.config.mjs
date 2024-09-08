import globals from 'globals';
import pluginJs from '@eslint/js';

export default {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jest,
    },
  },
  extends: [
    pluginJs.configs.recommended,
    'plugin:jest/recommended',
  ],
  plugins: [
    'jest',
  ]
};
