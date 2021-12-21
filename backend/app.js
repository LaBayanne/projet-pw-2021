var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const post_it = require("./routes/post_it");
const colonne = require("./routes/colonne");
const sprint = require("./routes/sprint");
const projet = require("./routes/projet");
const user = require("./users_routes/user");

var indexRouter = require('./routes/index');
var testAPIRouter = require('./routes/testAPI');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/testAPI', testAPIRouter);
app.use("/post_it",post_it);
app.use("/colonne",colonne);
app.use("/sprint",sprint);
app.use('/user',user);
app.use("/projet",projet);


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

app.listen(3000, () => console.log("Listening on 3000"));

module.exports = app;
