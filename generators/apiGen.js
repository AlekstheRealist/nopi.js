var fs = require('fs-extra');
var spawn = require('child_process').spawn;
var colors = require('colors');

var generateApi = function(apiName, currentWDir, directory) {
  var apiDestination = currentWDir + '/' + apiName;
  fs.mkdirs(apiDestination, function(err) {
    if (err) { console.log(err); }
  });

  // Server Start Command
  var projectStart = 'npm start';

  fs.copy(directory + '/api_template', apiDestination, function(err) {
    if (err) { console.log(err); }
  })

  console.log(colors.bold('Running npm install: '));

  var newApi = spawn('npm', ['install'], { cwd: apiDestination, stdio: 'inherit' });

  newApi.on('close', function (exitCode) {
    console.log(colors.bold('Done! cd to ') + colors.yellow.bold(apiName.toString()) + colors.bold(' and launch API server: ') + colors.bold.green(projectStart.toString()));
    console.log(colors.rainbow('    _   ______  ____  ____'));
    console.log(colors.rainbow('   / | / / __ \ / __ \ /  _/'));
    console.log(colors.rainbow('  /  |/ / / / / /_/ // / '));
    console.log(colors.rainbow(' / /|  / /_/ / ____// /   '));
    console.log(colors.rainbow('/_/ |_/\____/_/   /___/  '));
  });
};

module.exports.generateApi = generateApi;
