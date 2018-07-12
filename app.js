const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'node_modules')));


// routers
const routes = [
  {
    path: '/index',
    src: require('./routes/index')
  },
  {
    path: '/users',
    src: require('./routes/users')
  },
  {
    path: '/ga',
    src: require('./routes/ga')
  },
];
for(let i = 0; i < routes.length; i++){
  let route = routes[i];
  app.use(route.path, route.src);
}

const redirects = [
  {
    path: "/",
    to: "/index"
  },
  {
    path: "/mobile",
    to: "/ga"
  }
];
for(let i = 0; i < redirects.length; i++){
  let redirect = redirects[i];
  app.get(redirect.path, function(req, res){
    res.redirect(302, redirect.to);
  });
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
