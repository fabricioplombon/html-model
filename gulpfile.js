'use strict';

// Load plugins
var gulp = require('gulp'),
sass = require('gulp-sass'),
notify = require("gulp-notify"),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
bower = require('gulp-bower'),
compass = require('gulp-compass'),
imagemin = require('gulp-imagemin'),
minifyCss = require('gulp-minify-css'),
livereload = require('gulp-livereload'),
sourcemaps = require('gulp-sourcemaps'),
gulpSequence = require('gulp-sequence');

// Paths
var config = {
    bowerDir: './bower_components',
    scripts: './resources/js/*.js',
    styles: './resources/scss/',
    images: './resources/images/'
}

// Bower
gulp.task('bower', function() {
    return bower()
    .pipe(gulp.dest(config.bowerDir))
});

// Icons
gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./public/assets/fonts'));
});

//Swiper
gulp.task('swiper', function() {
    return gulp.src(config.bowerDir + '/swiper/dist/js/swiper.jquery.min.js')
        .pipe(gulp.dest('./resources/js/dist'));
});

//Swiper CSS
gulp.task('swiper-css', function() {
    return gulp.src(config.bowerDir + '/swiper/dist/css/swiper.min.css')
    .pipe(gulp.dest('./public/assets/css'));
});

//Jquery Validate
gulp.task('validate', function() {
    return gulp.src(config.bowerDir + '/jquery-validation/dist/jquery.validate.min.js')
        .pipe(gulp.dest('./resources/js/dist'));
});

// Picture Fill
gulp.task('picturefill', function() {
    return gulp.src(config.bowerDir + '/picturefill/dist/picturefill.min.js')
        .pipe(gulp.dest('./resources/js/dist'));
});

// Bootstrap CSS
gulp.task('bootstrap-css', function () {
 gulp.src('./resources/scss/bootstrap/bootstrap.scss')
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(rename('bootstrap.min.css'))
   .pipe(gulp.dest('./public/assets/css/'));
});

//Bootstrap JS
gulp.task('bootstrap-js', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('./public/assets/js'));
});

//Modernizr
gulp.task('modernizr', function() {
    return gulp.src(config.bowerDir + '/modernizr-min/modernizr.min.js')
        .pipe(gulp.dest('./public/assets/js'));
});

// CSS
gulp.task('css', function() {
  gulp.src(config.styles + '/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(compass({
      css: './resources/css',
      sass: './resources/scss',
      style: 'compressed'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(livereload());
});

// App
gulp.task('app-js', function() {
  return gulp.src('./resources/js/dist/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./resources/js/dist/temp'))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./public/assets/js'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(config.scripts)
  	.pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./resources/js/temp'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(livereload());
});

// Images
gulp.task('images', function() {
  return gulp.src(config.images +  '/**/*.{gif,jpg,png,svg}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true }))
    .pipe(gulp.dest('./public/assets/images'));
});

// Default Task
gulp.task('default', ['watch'], gulpSequence('bower', 'icons', 'images', ['swiper', 'swiper-css'], ['bootstrap-js', 'bootstrap-css'], 'modernizr', 'picturefill', 'validate', ['app-js', 'scripts'], 'css'));


// Watch Files For Changes
gulp.task('watch', function() {

    // Livereolad
    livereload.listen();

    // Styles
    gulp.watch(config.styles + '/**/*.scss', ['css']);

    // Watch .js files
    gulp.watch(config.scripts, ['scripts']);

});
