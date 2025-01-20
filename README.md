Electron Packager Plugin: Languages
---------------------------
[![GitHub license](https://img.shields.io/github/license/barinali/electron-packager-languages.svg)](https://github.com/barinali/electron-packager-languages/blob/master/LICENSE)
[![Travis CI](https://img.shields.io/travis/barinali/electron-packager-languages.svg)](https://travis-ci.org/barinali/electron-packager-languages/)
[![NPM Download Count](https://img.shields.io/npm/dt/electron-packager-languages.svg)](https://www.npmjs.com/package/electron-packager-languages)
[![Known Vulnerabilities](https://snyk.io/test/github/barinali/electron-packager-languages/badge.svg?targetFile=package.json)](https://snyk.io/test/github/barinali/electron-packager-languages?targetFile=package.json)


# Reason

After packaging an Electron application, it contains all possible languages whether it supports or not. Then all those languages are listed e.g. at the App Store. The folders of unsupported languages should be removed in order to hide those languages at the detail page of the product.

# Usage

Use the [`afterCopy`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#afterCopy) hook in Electron Packager to run this plugin.

```js
const setLanguages = require('electron-packager-languages');

electronPackager({
  ...
  afterCopy: [setLanguages(['en', 'en_GB'])]
})
```
Note that different platforms have different language/locale identifiers, e.g. Windows has `en-GB` while macOS has `en_GB`. See also [issue #57](https://github.com/barinali/electron-packager-languages/issues/57).

In order to protect users from accidentally removing all languages from an app, there's an `allowRemovingAll` option that defaults to `false`. It can be overridden like this: `setLanguages(['en', 'en_GB'], { allowRemoveAll: true })`.