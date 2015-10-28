var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    inject = require('gulp-inject');

// Styles
gulp.task('styles', function() {
    return sass('./assets/sass/*.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('app/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Inject
gulp.task('injection', function () {
  var target = gulp.src('./index.html');

  var sources = gulp.src(['./assets/js/*.min.js', './assets/css/*.min.css'], {read: false});

  return target.pipe(inject(sources, {ignorePath: 'public', addRootSlash: false }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    gulp.start('styles', 'injection', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

    // Watch .css files
    gulp.watch('./assets/css/*.min.css', ['styles', 'injection']);

    // Watch .scss files
    gulp.watch('./assets/sass/*.scss', ['styles', 'injection']);

    // Watch .js files
    gulp.watch('./app/*.js', ['scripts', 'injection']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in public/, reload on change
    gulp.watch(['./']).on('change', livereload.changed);

});