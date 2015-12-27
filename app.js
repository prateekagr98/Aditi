var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  session = require('express-session'),
  methodOverride = require('method-override'),
  multer = require('multer'),
  async = require('async'),
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname)
    }
  }),
  upload = multer({
    storage: storage
  }),
  LocalStrategy = require('passport-local').Strategy,
  AdminModel = require('./models/AdminModel'),
  ImageModel = require('./models/ImageModel');

//Constants
var TARGET_PATH = path.resolve(__dirname, './public/images/upload/');
var IMAGE_TYPES = ['image/jpeg', 'image/png'];

passport.use(new LocalStrategy(
  function (username, password, done) {
    AdminModel.findOne({
      username: username
    }, function (err, admin) {
      if (err) {
        return done(err);
      }

      if (!admin) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!admin.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, admin);
    });
  }
));

passport.serializeUser(function (admin, done) {
  done(null, admin._id);
});

passport.deserializeUser(function (id, done) {
  AdminModel.findById(id, function (err, admin) {
    done(err, admin);
  });
});

var routes = require('./routes/index'),
  users = require('./routes/users'),
  admin = require('./routes/admin'),
  api = require('./routes/api');

var app = express();

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/aditi';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.any(), function (req, res, next) {
  async.each(req.files, function (file, next) {
    file.path = file.path.replace('public', '');

    ImageModel.create({
      'category_id': req.body.category_id,
      'url': file.path
    }, function (err) {
      if (err) {
        console.error(err);
      }

      next();
    })
  }, function (err) {
    res.redirect('/admin');
  })
})

app.use('/admin', admin);
app.use('/', routes);
app.use('/users', users);
app.use('/portal/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;