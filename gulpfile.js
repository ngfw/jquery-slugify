var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var minifyCSS = require('gulp-minify-css');
var opn = require('opn');
var embedlr = require('gulp-embedlr');
var imagemin = require('gulp-imagemin');
var server = {
  host: 'localhost',
  port: '8080'
}
gulp.task('scripts', function() {
    return gulp.src(['app/js/*.js']).pipe(uglify({
        "preserveComments": "all"
    })).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('dist/build'));
});
gulp.task('styles', function() {
    return gulp.src(['app/less/*.less']).pipe(less()).on('error', console.log).pipe(minifyCSS()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('dist/build'));
});
gulp.task('webserver', function() {
    gulp.src('.').pipe(webserver({
        host: server.host,
        port: server.port,
        livereload: true,
        directoryListing: true
    }));
});
gulp.task('openbrowser', function() {
    opn('http://' + server.host + ':' + server.port);
});
gulp.task('html', function() {
    return gulp.src("app/*.html").pipe(embedlr()).pipe(gulp.dest('dist/'));
})
gulp.task('assets', function() {
    return gulp.src("app/assets/**").pipe(imagemin({
        optimizationLevel: 5
    })).pipe(gulp.dest('dist/assets/'));
});
gulp.task('watch', function() {
    gulp.watch('app/js/**', ['scripts']);
    gulp.watch('app/less/**', ['styles']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/assets/**', ['assets']);
});
gulp.task('default', ['scripts', 'styles', 'html', 'assets', 'webserver', 'watch', 'openbrowser']);