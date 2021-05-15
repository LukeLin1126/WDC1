var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: "Shh, its a secret!"}));


(()=>{


  // task 2.1

  let n = 1;

  app.all('/*', function (req, res, next) {
    // eslint-disable-next-line no-console
    console.log(`Received ${n} requests`);
    n++;
    next();
  });

  // task 2.2

  app.post('/users*', function (req, res, next) {
    // eslint-disable-next-line no-console
    console.log('POST from a user');
    next();
  });

  app.post('/users*', function (req, res, next) {

    if (req.get('Content-Type') !== "application/json") {
      res.status(412).send();
    } else {
      next();
    }

  });

  // task 3.3

  app.all('/users*', function (req, res, next) {

    if (req.session.tcaccept) {
      next();
    } else {
      res.status(403).send();
    }

  });


})();

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
