// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass')
    notify = require("gulp-notify")
    jshint = require('gulp-jshint')
    uglify = require('gulp-uglify')
    rename = require('gulp-rename')
    concat = require('gulp-concat')
    bower = require('gulp-bower')
    compass = require('gulp-compass');

//Paths
var config = {
	bowerDir: './bower_components',
	scripts: './resources/js/*.js',
  	styles: './resources/scss/'
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


// Bootsrap
gulp.task('bootstrap-css', function() {
	return sass(config.bowerDir + '/bootstrap-sass-official/assets/stylesheets/_bootstrap.scss', { 
			style: 'compressed',
			loadPath: [
                './resources/scss/_settings.scss'
            ]

	}) 
    .pipe(rename('bootstrap.min.css'))
    .pipe(gulp.dest('./public/assets/css'));
});


// CSS
gulp.task('css', function() {
  gulp.src(config.styles + '/*.scss')
    .pipe(compass({
      css: './resources/css',      
      sass: './resources/scss',
      style: 'compressed'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/assets/css'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(config.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./resources/js/temp'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'));
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

//Flickity
gulp.task('flickity', function() {
    return gulp.src(config.bowerDir + '/bower_components/flickity/dist/flickity.pkgd.min.js')
        .pipe(gulp.dest('./public/assets/js'));
});


// Default Task
gulp.task('default', ['watch'], function() {
    gulp.start('bower', 'icons', 'css', 'scripts', 'flickity', 'bootstrap-js', 'bootstrap-css', 'modernizr');
});


// Watch Files For Changes
gulp.task('watch', function() {

	// Styles
	gulp.watch(config.styles + '/**/*.scss', ['css']);

    // Watch .js files
    gulp.watch(config.scripts, ['scripts']);

});