import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    formatters: true,
    ignores: ['public/**', 'storage/**', 'bootstrap/ssr/**'],
  },
  {
    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
      'ts/no-explicit-any': 'error',
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
  },
)
