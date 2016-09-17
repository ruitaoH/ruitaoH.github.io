var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(compass({
            config_file: './config/compass.config.rb',
            css: 'style',
            sass: 'sass',
            task: 'compile'
        }));
});

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
