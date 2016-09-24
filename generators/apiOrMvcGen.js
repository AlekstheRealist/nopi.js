var fs = require('fs-extra');
var spawn = require('child_process').spawn;
var colors = require('colors');

var generateApiOrMvc = function(apiName, currentWDir, directory, database, type) {
  var projectDestination = currentWDir + '/' + apiName;
  fs.mkdirs(projectDestination, function(err) {
    if (err) { console.log(err); }
  });

  // Server Start Command
  var projectStart = 'npm run dev';

  fs.copy(directory + `/${database}_${type}_template`, projectDestination, function(err) {
    if (err) { console.log(err); }
  });

  console.log(colors.bold('Running npm install: '));

  var newApi = spawn('npm', ['install'], { cwd: projectDestination, stdio: 'inherit' });

  newApi.on('close', function (exitCode) {
    console.log(colors.bold('Done! cd to ') + colors.yellow.bold(apiName.toString()) + colors.bold(' and launch server: ') + colors.bold.green(projectStart.toString()));
    console.log(colors.rainbow('    _   ______  ____  ____'));
    console.log(colors.rainbow('   / | / / __ \ / __ \ /  _/'));
    console.log(colors.rainbow('  /  |/ / / / / /_/ // / '));
    console.log(colors.rainbow(' / /|  / /_/ / ____// /   '));
    console.log(colors.rainbow('/_/ |_/\____/_/   /___/  '));
  });
};

module.exports = generateApiOrMvc;
