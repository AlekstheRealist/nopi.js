// Server Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();

// Database Setup Example
// var mongoose = require('mongoose');
// mongoose.connect(/*Database URL Here*/);

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
app.listen(port);
console.log('Nopi API Listening On ' + port);
