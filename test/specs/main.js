const fs = require('fs');
const path = require('path');
const assert = require('assert');
const packager = require('electron-packager');
const setLanguages = require('../../src/index');

const APP_NAME = 'app';
const LANGUAGES = ['en', 'en_GB', 'en-US'];

const packagerOptions = {
  afterCopy: [setLanguages(LANGUAGES)],
  arch: 'x64',
  dir: './test/app',
  name: APP_NAME,
  out: './build/',
  overwrite: true,
  electronVersion: '1.7.5',
  prune: false,
};

function getLanguageFolderPath(givenPath, platform) {
  switch (platform) {
    case 'darwin':
    case 'mas':
      return path.resolve(givenPath, `${APP_NAME}.app/Contents/Resources`);
    case 'win32':
    case 'linux':
      return path.resolve(givenPath, 'locales');
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
      return paths.filter(folder => regex.test(folder));
    case 'win32':
    case 'linux':
      return paths;
    default:
      return [];
  }
}

function testCase(appPaths, platform) {
  const appPath = path.resolve('.', appPaths[0]);
  const resourcePath = getLanguageFolderPath(appPath, platform);
  const languageFolders = walkLanguagePaths(resourcePath, platform);

  languageFolders.forEach((languageFolder) => {
    const language = languageFolder.split('.')[0];

    if (!LANGUAGES.includes(language)) {
      assert.fail(`This language, "${language}", shouldn't be in the app.`);
    }
  });

  // eslint-disable-next-line no-console
  console.log(`Tests are passed for ${appPath}`);
}

function testPlatform(platform) {
  return packager({ ...packagerOptions, platform })
    .then(appPaths => testCase(appPaths, platform))
    .catch(err => assert.fail(err, 'The packaging process is failed!'));
}


(async function testRun() {
  await testPlatform('darwin');
  await testPlatform('mas');
  await testPlatform('linux');
  await testPlatform('win32');
}());
