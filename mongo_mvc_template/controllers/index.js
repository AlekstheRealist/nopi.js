// Router Dependencies
var express = require('express');
var router = express.Router();

// Index Page
var rootPage = require('../views/rootPage.js');

// Endpoints, Require Controllers ----------------

// Example:
// router.use('/post', require('./post'))

// Index Route
router.get('/', function(req, res) {
  res.send(
    rootPage(
      req,
      {
        title: 'Nopi',
        content: 'Welcome to Nopi!',
        notice: 'You can pass whatever data you want, either from an API or DB, ' +
          'into this template literal component and render it like this.'
      }
    )
  );
});

// -----------------------------------------------

module.exports = router;
