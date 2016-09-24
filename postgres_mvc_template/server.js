// Server Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./models');
var router = express.Router();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/assets'));

// Server Port
var port = process.env.PORT || 8080;

// Controllers Contain API Routes
app.use(require('./controllers'));

// Server Started
models.sequelize.sync().then(function() {
  app.listen(port);
  console.log('Nopi MVC Listening On ' + port);
});
