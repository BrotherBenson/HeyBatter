var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/index');
var mongoose = require('mongoose');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use('/', routes);
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function(){console.log('Connected to MongoDB');});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('HeyBatter, running at http://localhost:%s', port);
});