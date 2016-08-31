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

// Port
var port = process.env.PORT || 8080;

// Router Prefixed Paths
app.use('/', router);

// API Routes
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Nopi-API!' });
});

// Controllers Contain Routes
app.use(require('./controllers'));


// Server Started
models.sequelize.sync().then(function() {
  app.listen(port);
  console.log('Nopi API Listening On ' + port);
});
