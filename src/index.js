const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

function getResourcePath(givenPath) {
  return path.resolve(givenPath, '..');
}

function walkDir(dir, regex = /./g) {
  return fs.readdirSync(dir)
    .filter((currentPath) => fs.statSync(path.resolve(dir, currentPath)).isDirectory() && regex.test(currentPath));
}

// eslint-disable-next-line max-params
module.exports = function languages(languages) {
  return function(buildPath, electronVersion, platform, arch, callback) {
    // eslint-disable-next-line
    if (['darwin', 'mas'].includes(platform)) {
      const resourcePath = getResourcePath(buildPath);
      const excludedLanguages = languages.map((l) => `${l}.lproj`);
      const languageFolderFilter = new RegExp(`\.(lproj)$`);

      const languageFolders = walkDir(resourcePath, languageFolderFilter);
      languageFolders.filter((langFolder) => !excludedLanguages.includes(langFolder)).forEach((langFolder) => {
        rimraf.sync(path.resolve(resourcePath, langFolder))
      });
    }

    callback();
  }
}
