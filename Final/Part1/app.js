var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sanitizer = require('express-html-sanitizer');
const sanitizeReqBody = sanitizer();
const noCache = require('nocache');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// import mysql nodejs
let mysql = require('mysql');

app.use(require('body-parser').json());
app.use(sanitizeReqBody);
app.use(noCache());

// create connection Pool
let dbConnectionPool = mysql.createPool({
  // host: 'localhost',
  host: 'bt-02-test.in.llycloud.com',
  user: 'root',
  password: '123.com',
  port: 3306,
  database : 'wdc-final'
});
// inject pool into express request : req -->
app.use(function (req, res,next) {
  req.pool = dbConnectionPool;
  // middleware
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
