const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

function getLanguageFolderPath(givenPath, platform) {
  switch (platform) {
    case 'darwin':
    case 'mas':
      return path.resolve(givenPath, '..');
    case 'win32':
    case 'linux':
      return path.resolve(givenPath, '..', '..', 'locales');
    default:
      return path.resolve(givenPath);
  }
}

function getLanguageFileExtension(platform) {
  switch (platform) {
    case 'darwin':
    case 'mas':
      return 'lproj';
    case 'win32':
    case 'linux':
      return 'pak';
    default:
      return '';
  }
}

function walkLanguagePaths(dir, platform) {
  const regex = new RegExp(`.(${getLanguageFileExtension(platform)})$`);
  const paths = fs.readdirSync(dir);

  switch (platform) {
    case 'darwin':
    case 'mas':
      return paths.filter(currentPath => fs
        .statSync(path.resolve(dir, currentPath)).isDirectory() && regex.test(currentPath));
    case 'win32':
    case 'linux':
      return paths;
    default:
      return [];
  }
}

module.exports = function setLanguages(languages) {
  return function electronPackagerLanguages(buildPath, electronVersion, platform, arch, callback) {
    const resourcePath = getLanguageFolderPath(buildPath, platform);
    const excludedLanguages = languages.map(l => `${l}.${getLanguageFileExtension(platform)}`);
    const languageFolders = walkLanguagePaths(resourcePath, platform);

    languageFolders
      .filter(langFolder => !excludedLanguages.includes(langFolder))
      .forEach(langFolder => rimraf.sync(path.resolve(resourcePath, langFolder)));

    callback();
  };
};
