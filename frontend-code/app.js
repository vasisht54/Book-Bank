const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const cartRouter = require('./routes/cart');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(require('express-session')({
  secret: 'swapnil the fool',
  resave: false,
  saveUninitialized: false
}));

const userModel = require('./models/user');

//configure auth here.
passport.use(new localStrategy(
  function (username, password, done) {
    userModel.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

// adding an authenticated pages module
app.use((req, res, next) => {
  const allowedUnauthenticatedRoutes = [
    '/',
    '/login',
    '/register',
    '/books',
    '/books/get-reviews-for-buyer',
    '/books/get-seller-reviews'
  ];
  if (!req.user && !allowedUnauthenticatedRoutes.includes(req.path)) {
    next(createError(401));
  }
  console.log(req.path);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/cart', cartRouter);

//We need to get rid of this and do something else entirely. This should never be connecting directly to the database.
mongoose.connect('mongodb+srv://deepak:deepak123@databaseforbookapi-gzios.mongodb.net/BookWebsite?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log('Error in DB connection : ' + err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error pagensureIndexe
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
