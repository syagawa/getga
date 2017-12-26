const gulp = require("gulp");
const nodemon = require('gulp-nodemon');

gulp.task("server", function(){
  nodemon(
    {
      "script": "./bin/www"
    }
  );
});

gulp.task("default", ["server"], function(){
});
