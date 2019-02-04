var express = require('express');
var app = express();
var http = require('http');
var util = require('util');
var async = require('async');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var logger = require('./logger.js');
var mongoose = require('mongoose');
//var db = require('./server/dbconnection.js');
var MongoStore = require('connect-mongodb-session')(session);
var routes = require('./routes.js');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());

logger.debug("Overriding 'Express' logger");
app.use(require('morgan')({ "stream": logger.stream }));

routes(app);
var port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log('FollowIot / Discover Listening on ', port);
});

module.exports = app;






