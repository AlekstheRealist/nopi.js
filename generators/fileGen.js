var fs = require('fs-extra');
var _ = require('lodash');
var colors = require('colors');

var generateFile = function(foundPath, fileType, fileName, directory) {
  var readTemplate = fs.createReadStream(directory + '/file_templates/' + fileType + '.js');
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
};

module.exports.generateFile = generateFile;
