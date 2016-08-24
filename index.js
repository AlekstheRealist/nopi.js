#!/usr/bin/env node
// Project Dependencies
var program = require('commander');
var colors = require('colors');
var inquirer = require('inquirer');
var _ = require('lodash');

// Nopi Files
var gPath = require('./generators/pathGen.js');
var gApi = require('./generators/apiGen.js');
var gFile = require('./generators/fileGen.js');

program
  .version('0.0.2')
  .option('new <apiName>', 'Generate New Node API.')
  .option('controller <controllerName>', 'Generate Controller file.')
  .option('model <ModelName>', 'Generate Model file.')
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
  console.log(colors.bold('Generating New API: ') + colors.yellow(apiName.toString()) + colors.bold(' in ') + colors.yellow(currentWDir.toString()));
  gApi.generateApi(apiName, currentWDir, directory);
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
  var folderPath = gPath.generatePath(fileType + 's', currentWDir);
  console.log(colors.bold.underline('Generating ' + _.capitalize(fileType) + ' File:') + ' ' + colors.yellow(fileName + '.js'));
  gFile.generateFile(folderPath, fileType, fileName, directory);
}
