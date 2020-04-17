var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors') ;
var clientSessions = require('client-sessions');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorRouter = require('./routes/doctorRoute');
var patientRouter = require('./routes/patientRoute');
var surveyRouter = require('./routes/surveyRoute');
var db = require('./db.js');
var surveyPlan = require('./surveyPlan');

var app = express();


app.use(cors());//Default cors allowall we have to change heders

app.use(clientSessions({
  cookieName: 'sessions', // cookie name, and use req.sessions to set value
  secret: 'AliTheBoss',
  duration: 5 * 60 * 1000, // how long the session will stay valid in ms
  cookie: {
      path: '/',
      maxAge: 5 * 60 * 1000,
      httpOnly: true, // when true, cookie is not accessible from javascript
      ephemeral: false // when true, cookie expires when the browser closes
  }
}))




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
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/survey', surveyRouter);

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
db.connectDB();
surveyPlan.plan();
module.exports = app;
