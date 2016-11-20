var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var prefix = require('gulp-autoprefixer');

// our compile project is in build folder and this is our root we want to see in browser
gulp.task('connect', function(){
  connect.server({
    root: 'build',
    livereload: true
  });
});

// keeps gulp from crashing for scss errors
// compile sass files from source. Add vendor prefix and save in build
gulp.task('sass', function () {
  return gulp.src('./source/assets/sass/*.sass')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest('./build/assets/css'));
});

// compile jade files into html
gulp.task('jade', function() {
    return gulp.src('./source/*.jade')
        .pipe(jade({ pretty: true })) // pip to jade plugin
        .pipe(gulp.dest('./build/')); // tell gulp our output folder
});


gulp.task('livereload', function (){
  gulp.src('./build/**/*')
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./source/assets/sass/**/*.sass', ['sass']);
  gulp.watch('./source/*.jade', ['jade']);
  gulp.watch('./build/**/*', ['livereload']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'jade']);