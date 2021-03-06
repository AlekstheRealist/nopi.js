#!/usr/bin/env node
// Project Dependencies
var program = require('commander');
var colors = require('colors');
var inquirer = require('inquirer');
var _ = require('lodash');
var spawn = require('child_process').spawn;

// Nopi Files
var generatePath = require('./generators/pathGen.js');
var generateApiOrMvc = require('./generators/apiOrMvcGen.js');
var generateFile = require('./generators/fileGen.js');

program
  .version('0.3.2')
  .option('new <Name>', 'Generate New Node API or MVC Project.')
  .option('-v, view <viewName>', 'Generate View file.')
  .option('-c, controller <controllerName>', 'Generate Controller file.')
  .option('-m, model <ModelName>', 'Generate Model file.')
  .option('db, <migrate>', 'Run Pending Migrations (Postgresql Only)')
  .parse(process.argv);

// Directory for Nopi.js
var directory = __dirname;

// Current Working Directory
var currentWDir = process.cwd();

// Automated Help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// API Generation
if (typeof program.new !== 'undefined') {
  var apiName = program.new;
  setTimeout(function() {
    var question = [
      {
        type: 'input',
        name: 'projectType',
        message: 'Enter Project Type (api / mvc):'
      },
      {
        type: 'input',
        name: 'database',
        message: 'Enter Database Type (mongo / postgres):'
      }
    ];

    inquirer.prompt(question).then(function (answer) {
      var database = answer.database;
      var type = answer.projectType;
      if (database.match(/mongo/) || database.match(/postgres/) && type.match(/api/) || type.match(/mvc/)) {
        console.log(`${colors.bold('Generating New Nopi ' + _.upperCase(type) + ' Project: ')}${colors.yellow(apiName.toString())}${colors.bold(' in ')}${colors.yellow(currentWDir.toString())}${colors.bold(' with ')}${colors.yellow(_.capitalize(database.toString()))}${colors.bold(' database.')}`);
        generateApiOrMvc(apiName, currentWDir, directory, database, type);
      } else {
        console.log(colors.red('Selected Database or Project Type Does Not Exist.'));
      }
    });
  }, 100);
}

// File Generation
var fileType = '';
var fileName = '';

// Set File Variables
if (typeof program.view !== 'undefined') {
  fileType = 'view';
  fileName = _.upperFirst(program.view);
}
if (typeof program.controller !== 'undefined') {
  fileType = 'controller';
  fileName = _.upperFirst(program.controller);
}
if (typeof program.model !== 'undefined') {
  fileType = 'model';
  fileName = _.upperFirst(program.model);
}

// Generate File Call
if (fileType.length > 1 && fileName.length > 1) {
  var folderPath = generatePath(fileType + 's', currentWDir);
  console.log(colors.bold.underline('Generating ' + _.capitalize(fileType) + ' File:') + ' ' + colors.yellow(fileName + '.js'));
  generateFile(folderPath, fileType, fileName, directory, currentWDir);
}

// Run Pending Migrations
if (typeof program.db !== 'undefined') {
  var projectPackageJSON = require(currentWDir + '/package.json');

  if (projectPackageJSON.nopi_database == 'postgres') {
    var migrationType = program.db;
    var migrationCommand = `db:${migrationType}`;

    var runMigrations = spawn('node_modules/.bin/sequelize', ['migrationCommand'], { stdio: 'inherit' });
    runMigrations.on('close', function (exitCode) {
      console.log('Successfuly Ran Pending Migrations.');
    });
  } else {
    // Accounts for Missing field in package.json
    console.log(`The ${colors.green('package.json')} File Is ${colors.red('Not')} a ${colors.bold('Nopi.js')} Postgresql API.`);
    console.log(`${colors.red('Cannot Migrate Database')}.`);
  }
}
