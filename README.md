Electron Packager Plugin: Languages
---------------------------
[![GitHub license](https://img.shields.io/github/license/barinali/electron-packager-languages.svg)](https://github.com/barinali/electron-packager-languages/blob/master/LICENSE)
[![Travis CI](https://img.shields.io/travis/barinali/electron-packager-languages.svg)](https://travis-ci.org/barinali/electron-packager-languages/)


# Reason

After packaging a MacOS application, it contains all possible languages whether it supports or not. Then all those languages are listed at the App Store. The folders of unsupported languages should be removed in order to hide those languages at the detail page of the product.

# Usage

Use the [`afterCopy`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#afterCopy) hook in Electron Packager to run this plugin.

```js
const setLanguages = require('electron-packager-languages');

electronPackager({
  ...
  afterCopy: [setLanguages(['en', 'en_GB'])]
})
```