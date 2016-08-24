var fs = require('fs-extra');
var ff = require('node-find-folder');
var prependFile = require('prepend-file');

var generatePath = function(fileType, currentWDir) {
  var apiPathFile = currentWDir + '/.apiPath/.' + fileType;
  fs.ensureFileSync(apiPathFile, function(error) {
    if (error) { console.log(error); }
  });

  var readApiPath = fs.readFileSync(apiPathFile, 'utf8');
  var fileRExp = new RegExp(fileType, 'g');
  var folderPath = null;

  if (readApiPath.match(fileRExp)) {
    folderPath = readApiPath;
  } else {
    console.log('Saving Path To: ' + apiPathFile.match(/\/.apiPath.+/g));
    folderPath = new ff(fileType, {nottraversal: ['spec', 'test', 'tests', 'project_template', 'node_modules', 'user_auth_template']});
    prependFile(apiPathFile, folderPath, function(err) {
      if (err) { console.log(err); }
    });
  }

  var gitIgnorePath = currentWDir + '/.gitignore';
  fs.access(gitIgnorePath, fs.F_OK, function(error) {
    if (error) {
      console.log('Adding: .apiPath to .gitignore but file does not exist.');
    } else {
      var gitIgnoreFile = fs.readFileSync(gitIgnorePath, 'utf8');
      if (!gitIgnoreFile.match(/\.apiPath/)) {
        prependFile(gitIgnorePath, '.apiPath\n', function(error) {
          if (error) { console.log(error); }
        });
      }
    }
  });

  return(folderPath);
};

module.exports = generatePath;
