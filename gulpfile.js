var destDir = 'bin';
var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var less = require('gulp-less');
var debug = require( 'gulp-debug' );
var clean = require( 'gulp-clean' );
var livereload = require('gulp-livereload');
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');

gulp.task('default', ['style']);


//CODESTYLE
gulp.task('style', function () {
        runSequence('jshint', 'jscs', 'htmlhint', 'csscomb');
    }
);

gulp.task('htmlhint', function () {
    return gulp.src('client_src/**/*.html')
        .pipe(htmlhint('.htmlhintrc'))
        .on('error', handleError)
        .pipe(htmlhint.reporter());
});

gulp.task('jscs', function () {
    return gulp.src('client_src/**/*.js')
        .pipe(jscs({
            fix: true,
            configPath: '.jscs.json'
        }).on('error', handleError))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('jshint', function () {
    return gulp.src('client_src/**/*.js')
        .pipe(jshint().on('error', handleError))
        .pipe(jshint.reporter('default'));
});

gulp.task('csscomb', function () {
    return gulp.src('client_src/**/*.less')
        .pipe(csscomb().on('error', handleError))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});
//CODESTYLE//

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}

