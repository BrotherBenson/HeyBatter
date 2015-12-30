var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('main');
});

router.get('/league', function(req, res, next) {
  res.render('league');
});

router.get('/game', function(req, res, next) {
  res.render('game');
});

router.get('/playoffs', function(req, res, next) {
  res.render('playoffs');
});

router.get('/playerCareer', function(req, res, next) {
  res.render('playerCareer');
});

router.get('/coachCareer', function(req, res, next) {
  res.render('coachCareer');
});

module.exports = router;