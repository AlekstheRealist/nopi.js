// Server Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./models');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// Port
var port = process.env.PORT || 8080;

// API Routes
var router = express.Router();
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Nopi API!' });
});

// Controllers Contain Routes
app.use(require('./controllers'));

// Router Prefixed Paths
app.use('/api', router);

// Server Started
models.sequelize.sync().then(function() {
  app.listen(port);
  console.log('Nopi API Listening On ' + port);
});
