var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
const sanitizer = require('express-html-sanitizer');
const sanitizeReqBody = sanitizer();


var app = express();
app.use(helmet());
app.disable('x-powered-by');
app.use(require('body-parser').json());
app.use(sanitizeReqBody);


var mysql = require('./sql/mysql');
var dbConnectionPool = mysql.createPool({ host: 'localhost', user: 'test', password: 'password', database: 'blog'});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) { req.pool = dbConnectionPool; next(); });

app.use(session({
    secret: '508510c6-19f3-4278-91ed-347ed4a473e7',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
