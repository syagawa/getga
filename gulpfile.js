const gulp = require("gulp");
const nodemon = require("gulp-nodemon");

const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config");

const notifier = require("node-notifier");

const browser = require("browser-sync");

const runSequence = require("run-sequence");

const errorHandler = function(error){
  var message;
  if(error.message){
    message = error.message;
  }else{
    message = error;
  }
  notifier.notify(
    {
      title: 'Error occured in gulp or Webpack processing.',
      wait: true,
      message: message
    },
    function(){
      console.log(error);
    }
  );
};

const webpackJSError = function(){
  errorHandler("Webpack Error : JS");
  this.emit("end");
};
const webpackCSSError = function(){
  errorHandler("Webpack Error : CSS");
  this.emit("end");
};

gulp.task("js", function(){
  return webpackStream(webpackConfig.js, webpack)
          .on("error", webpackJSError)
          .pipe(gulp.dest("public"))
          .pipe(browser.reload({stream:true}));
});

gulp.task("css", function(){
  return webpackStream(webpackConfig.css, webpack)
          .on("error", webpackCSSError)
          .pipe(gulp.dest("public"))
          .pipe(browser.reload({stream:true}));
});

gulp.task("export", function(){
  return (function(){
    runSequence("js");
    runSequence("css");
  })();
});

gulp.task("watch", function(){
  gulp.watch(["src/js/**/*.js","!src/js/min/**/*.js"],["js"]);
  gulp.watch("src/scss/**/*.scss",["css"]);
});


gulp.task("server", function(){
  runSequence("export", "watch");
  nodemon(
    {
      "script": "./bin/www"
    }
  );
  browser({
    browser: "chrome"
  });
  browser.reload({stream:true});
});

gulp.task("default", ["server"], function(){
});
