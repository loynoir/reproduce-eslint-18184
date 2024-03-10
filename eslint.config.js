export default [
  {
    ignores:
      process.env.PRETTY === '1'
        ? ['!ignore42/a.js', '!src/']
        : ['*eslint.config.js', 'ignore1/a.js', 'ignore2/a.js', 'ignore42/b.js', 'ignore42/c.js']
  },
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error'
    }
  }
]