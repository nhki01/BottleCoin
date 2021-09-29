var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
var multer = require('multer');
var cors = require('cors');
var filestore = require('session-file-store')(session);
var passport = require('passport');

require('./passport').config(passport);
require('dotenv').config();

var indexRouter = require('./routes/index');

var joinRouter = require('./routes/sign/join');
var loginRouter = require('./routes/sign/login');
var logoutRouter = require('./routes/sign/logout');

var selectRouter = require('./routes/account/select');
var updateRouter = require('./routes/account/update');
var deleteRouter = require('./routes/account/delete');

var machineRouter = require('./routes/machine/machine_list');
var returnRouter = require('./routes/machine/return');

var pointRouter = require('./routes/log/point_check');
var bottleRouter = require('./routes/log/bottle_check');

var lottoRouter = require('./routes/lotto/lotto_prt');

var mystoreRouter = require('./routes/store/mystore');
var storeRouter = require('./routes/store/store');

var bottlekingRouter = require('./routes/event/bottleking');

var qrRouter = require('./routes/qr/qr');
var checkRouter = require('./routes/qr/check');

var userRouter = require('./routes/admin/user_list');

var app = express();

const maria = require('./maria.js');
maria.connect();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  // store: new filestore(),
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(methodOverride((req, res) => {
  if(req.body && typeof req.body === 'object' && req.body._method) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    console.log('method :: ',method);
    delete req.body._method
    return method
  }
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);

app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.use('/myinfo', selectRouter);
app.use('/myinfo_modify', updateRouter);
app.use('/delete', deleteRouter);

app.use('/machine', machineRouter);
app.use('/return', returnRouter);

app.use('/point', pointRouter);
app.use('/bottle', bottleRouter);

app.use('/lotto', lottoRouter);

app.use('/mystore', mystoreRouter);
app.use('/store', storeRouter);

app.use('/qr', qrRouter);
app.use('/check', checkRouter);

app.use('/bottleking', bottlekingRouter);

app.use('/user', userRouter);

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
