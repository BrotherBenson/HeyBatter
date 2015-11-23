var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var app = express();

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use('/', routes);
app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('HeyBatter, running at http://localhost:%s', port);
});

