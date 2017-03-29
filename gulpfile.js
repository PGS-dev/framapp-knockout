var browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(); // automatyczne bedzie zaczytywal pluginy w trakcie ich napotkania
// autoprefixer = require('gulp-autoprefixer'),
// concat = require('gulp-concat'),
// cssmin = require('gulp-cssmin'),
// jshint = require('gulp-jshint'),
// uglify = require('gulp-uglify'),
// watch = require('gulp-watch'),
// flatten = require('gulp-flatten'),
// size = require('gulp-size'),
// useref = require('gulp-useref'),
// filter =  require('gulp-filter'),
// clean = require('gulp-clean');

var DIR_DIST = './release';
var DIR_SOURCE = './develop';

// assets - laczy zadane <script> lub <link> w jeden plik wynikowy
gulp.task('assets', ['clean'], function () {
    return gulp.src(DIR_SOURCE + '/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(plugins.flatten())    // splaszcza strukutre katalogowa do jednego 
        .pipe(plugins.size())       // zwraca wielkosc plikow projektu w KB
        .pipe(gulp.dest(DIR_DIST + '/fonts'));
});

gulp.task('clean', function () {
    return gulp.src(DIR_DIST)
        .pipe(plugins.clean());     // usuwa zawartosc katalogu
});

gulp.task('js', function () {
    return gulp.src([DIR_SOURCE + '/**/*.js', '!**/*.min.js'])
        .pipe(plugins.jshint());
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('html', ['clean', 'assets', 'sass'], function () {
    var filterJs = plugins.filter(['**/*.js'], { restore: true }); // ?

    return gulp.src(DIR_SOURCE + '/index.html')
        .pipe(plugins.useref())            // laczy linki w HTML typu <script> lub <link> w jeden tag (plik)
        .pipe(filterJs)                    // przelaczamy sie na filtr czyli pliki js (bo bedziemy minifikowac)
        .pipe(plugins.uglify())            // minifikacja js
        .pipe(filterJs.restore)            // powrot do plikow przed zastosowaniem filtra
        .pipe(gulp.dest(DIR_DIST));

    // Ponizej wersja bez filtrow
    // return gulp.src(['**/*.js'])
    //     .pipe(plugins.uglify())
    //     .pipe(gulp.dest(DIR_DIST));
});

gulp.task('sass', function () {
    return gulp.src(DIR_SOURCE + '/**/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer('last 1 version'))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest(DIR_DIST))
        .pipe(gulp.dest(DIR_SOURCE))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['html'], function () { // uruchamia browerSync (zwykle startujemy od tego taska: gulp serve)
    browserSync.init({
        open: true,
        port: 8080,
        server: {
            baseDir: [  // katalogi, w ktorych serwer szuka zaciaganych plikow (js, css itd.)
                DIR_SOURCE + '/pages/home/',
                DIR_DIST,
                DIR_SOURCE
            ],
            index: 'index.html'
        }
    });

    // nasluchuje zmiany w nastepujacych lokalizacjach i odzwierciedla w przegladarce
    gulp.watch(DIR_SOURCE + '/**/*.js', ['js-watch']);   // w js-watch jest reload() ?
    gulp.watch(DIR_SOURCE + '/**/*.scss', ['sass']);     // w sass jest stream() ?
    gulp.watch(DIR_SOURCE + '/**/*.html').on('change', browserSync.reload);
});

gulp.task('default');