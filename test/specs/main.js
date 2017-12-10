const fs = require('fs');
const path = require('path');
const assert = require('assert');
const packager = require('electron-packager');
const setLanguages = require('../../src/index');

const APP_NAME = 'app';
const LANGUAGES = ['en', 'en_GB'];

const packagerOptions = {
  afterCopy: [setLanguages(LANGUAGES)],
  arch: 'x64',
  dir: './test/app',
  name: APP_NAME,
  out: './build/',
  overwrite: true,
  electronVersion: '1.7.5',
};

const testPlatform = (platform, done) => packager({ ...packagerOptions, platform }, done);

const testCase = function (err, appPaths) {
  const appPath = path.resolve('.', appPaths[0]);
  const resourcePath = path.resolve(appPath, `${APP_NAME}.app/Contents/Resources`);
  const resources = fs.readdirSync(resourcePath);
  const languageFolderFilter = new RegExp(`\.(lproj)$`);
  const languageFolders = resources.filter((folder) => languageFolderFilter.test(folder));

  languageFolders.forEach((languageFolder) => {
    const language = languageFolder.split('.')[0];

    if (!LANGUAGES.includes(language)) {
      assert.fail(`This language, "${language}", shouldn't be in the app.`);
    }
  });

  console.log(`Tests are passed for ${appPath}`);
};

(async function() {  
  await testPlatform('darwin', testCase);
  await testPlatform('mas', testCase);
})();
