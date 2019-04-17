var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var session = require('express-session');


var app = express();

app.use(logger('dev'));
app .use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//change this back to public during development
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//Session
app.use(session({
    secret: 'drew',
    saveUninitialized: false,
    resave: false
}));

const db = require('mongoose');
db.connect('mongodb://localhost:27017/hpDatabase')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


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
  res.send(err);
});

module.exports = app;
