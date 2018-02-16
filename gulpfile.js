var gulp = require('gulp'),
    bs   = require('browser-sync').create();

gulp.task('sync', function() {
    bs.init({
        server: {
            baseDir: './'
        },
        open: false,
        ghostMode: false
    });
});

gulp.task('watch', ['sync'], function() {
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./*.html').on('change', bs.reload);
    gulp.watch('./js/*.js').on('change', bs.reload);
});

gulp.task('css', function() {
    return gulp.src('./css/*.css')
        .pipe(bs.reload({stream: true}))
})
