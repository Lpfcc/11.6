var gulp = require('gulp');
var server = require('gulp-webserver');
var scss = require('gulp-sass');
var path = require('path');
var url = require('url');
var fs = require('fs');

gulp.task('css', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('css'))
})

gulp.task('ser', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return false;
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

gulp.task('dev', gulp.series('css', 'ser', 'watch'));