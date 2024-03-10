# reproduce-eslint-18184

reproduce-eslint-18184

## bug

https://eslint.org/docs/latest/use/configure/configuration-files-new

> If ignores is used without any other keys in the configuration object, then the patterns act as global ignores. 

But currently, `flat config global ignores` does not support `git-ignore-alike-syntax` to negate pattern.

Thus, when project structure grows complexer, ugly hard code grows larger.

## reproduce

```sh
$ npm i
...
$ npm test
...
```

## actual

Pretty config:

```js
export default [
  {
    ignores: ['!ignore42/a.js', '!src/']
  },
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error'
    }
  }
]
```

Pretty config is not working:

```sh
/path/to/reproduce/eslint.config.js
  11:2  error  Missing semicolon  semi

/path/to/reproduce/ignore1/a.js
  1:4  error  Missing semicolon  semi

/path/to/reproduce/ignore2/a.js
  1:4  error  Missing semicolon  semi

/path/to/reproduce/ignore42/a.js
  1:4  error  Missing semicolon  semi

/path/to/reproduce/ignore42/b.js
  1:4  error  Missing semicolon  semi

/path/to/reproduce/ignore42/c.js
  1:4  error  Missing semicolon  semi

/path/to/reproduce/src/a.js
  1:4  error  Missing semicolon  semi

✖ 7 problems (7 errors, 0 warnings)
  7 errors and 0 warnings potentially fixable with the `--fix` option.

```

Ugly config as workaround:

```js
export default [
  {
    ignores: ['eslint.config.js', 'ignore1/a.js', 'ignore2/a.js', 'ignore42/b.js', 'ignore42/c.js']
  },
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error'
    }
  }
]
```

Ugly config is working:

```sh
/path/to/reproduce/ignore42/a.js
  1:4  error  Missing semicolon  semi

/path/to/reproduce/src/a.js
  1:4  error  Missing semicolon  semi

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.

```

## expected

Pretty config:

```js
export default [
  {
    ignores: ['!ignore42/a.js', '!src/']
  },
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error'
    }
  }
]
```

Pretty config is working:

```sh
/path/to/reproduce/ignore42/a.js
  1:4  error  Missing semicolon  semi

/path/to/reproduce/src/a.js
  1:4  error  Missing semicolon  semi

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.

```
