#!/usr/bin/env node
// Project Dependencies
var program = require('commander');
var colors = require('colors');
var inquirer = require('inquirer');
var _ = require('lodash');
var spawn = require('child_process').spawn;

// Nopi Files
var generatePath = require('./generators/pathGen.js');
var generateApi = require('./generators/apiGen.js');
var generateFile = require('./generators/fileGen.js');

program
  .version('0.2.0')
  .option('new <apiName>', 'Generate New Node API.')
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
        name: 'database',
        message: 'Enter Database Type, mongo / postgres:'
      }
    ];

    inquirer.prompt(question).then(function (answer) {
      var database = answer.database;
      if (database.match(/mongo/) || database.match(/postgres/)) {
        console.log(`${colors.bold('Generating New API: ')}${colors.yellow(apiName.toString())}${colors.bold(' in ')}${colors.yellow(currentWDir.toString())}${colors.bold(' with ')}${colors.yellow(_.capitalize(database.toString()))}${colors.bold(' database.')}`);
        generateApi(apiName, currentWDir, directory, database);
      } else {
        console.log(colors.red('Selected Database Type Does Not Exist.'));
      }
    });
  }, 100);
}

// File Generation
var fileType = '';
var fileName = '';

// Set File Variables
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
