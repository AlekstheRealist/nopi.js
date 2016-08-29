var fs = require('fs-extra');
var exec = require('child_process').exec;
var _ = require('lodash');
var colors = require('colors');
var inquirer = require('inquirer');

var generateFile = function(foundPath, fileType, fileName, directory, currentWDir) {

  var projectPackageJSON = require(currentWDir + '/package.json');

  if (projectPackageJSON.nopi_database == 'mongo') {
    // For All Mongo Files
    fileCreation(foundPath, fileType, fileName, directory, currentWDir, projectPackageJSON);

  } else if (projectPackageJSON.nopi_database == 'postgres') {
    if (fileType == 'controller') {
      // For Postgres Controllers
      fileCreation(foundPath, fileType, fileName, directory, currentWDir, projectPackageJSON);

    } else {
      // For Postgresql Models
      setTimeout(function() {
        var question = [
          {
            type: 'input',
            name: 'attr',
            message: 'Enter Attribute(s) (Example: "name:datatype"):'
          }
        ];

        inquirer.prompt(question).then(function (answer) {
          var attr = answer.attr.toString();
          exec('node_modules/.bin/sequelize model:create --name ' + fileName + ' --attributes ' + attr, function(error) {
            if (error) { return(console.log('Error: ' + error)); }
            console.log('Successfuly created ' + colors.yellow('Migration') + ' and ' + colors.yellow(fileName + '.js Model') + ' in ' + colors.yellow(foundPath.toString()) + ' folder.');
          });
        });
      }, 100);
    }

  } else {
    // Accounts for Missing field in package.json
    console.log(`The ${colors.green('package.json')} File Is ${colors.red('Missing')} ${colors.bold('nopi_database')} Key.`);
    console.log(`${colors.red('Cannot Determine Database Type')}.`);
  }
};

var fileCreation = function(foundPath, fileType, fileName, directory, currentWDir, projectPackageJSON) {
  var readTemplate = fs.createReadStream(directory + '/file_templates/' + projectPackageJSON.nopi_database + '_' + fileType + '.js');
  var filePath = './' + foundPath + '/' + fileName + '.js';

  fs.stat(filePath, function(err, stats) {
    if (stats === undefined) {
      var writeFile = fs.createWriteStream(filePath);

      readTemplate.on('data', function(chunk) {
        var newData = chunk.toString()
          .replace(/__NAME__/g, fileName);

        writeFile.write(newData);
        writeFile.end();
      });

      readTemplate.on('end', function(error) {
        if (error) { console.log(colors.red(error.toString())); }
      });

      console.log('Successfuly created ' + colors.yellow(fileName + '.js') + ' in ' + colors.yellow(filePath.toString()));
    } else {
      console.log(colors.yellow(fileName + '.js') + colors.red(' already exists in this project.'));
    }
  });
}

module.exports = generateFile;
