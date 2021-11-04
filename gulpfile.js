let gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    notify = require('gulp-notify'),
    babel = require("gulp-babel"),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng = require('gulp-tinypng'),
    browserSync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include');

gulp.task('img', function (done) {
    gulp.src('src/assets/img/**/*.{png,jpg,jpeg}')
        .pipe(gulp.dest('build/img'));
    done();
});

gulp.task('tinypng', function (done) {
    gulp.src('build/img/*.{png,jpg,jpeg}')
        .pipe(tinypng('mt3FPFKp1LJMYTXrSMRJfm9tPKSygN5q'))
        .pipe(gulp.dest('build/img'));
    done();
});

gulp.task('sass', function () {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(autoprefixer())
        .pipe(csso(
            {
                debug: true
            }
        ))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
});

gulp.task("script", function () {
    return gulp.src("src/assets/script/**/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("build/script"));
});

gulp.task('includeHTML', function() {
    return gulp.src('src/pages/**/[^_]*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('minify', function () {
    return gulp.src('src/pages/**/[^_]*.html')
        // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    browserSync.watch('build', browserSync.reload)
});

gulp.task('watch', function () {
    gulp.watch('src/pages/**/*.html', gulp.series('includeHTML'));
    gulp.watch('src/assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/assets/script/**/*.js', gulp.series('script'));
    gulp.watch('src/assets/img/**/*.{png,jpg,jpeg}', gulp.series('img'));
});

gulp.task('default', gulp.series(
    gulp.parallel('includeHTML', 'sass','script', 'img'),
    gulp.parallel('watch','serve')
));