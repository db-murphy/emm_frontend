/*!
 * =================================================
 * name: gulpfiles.js
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * =================================================
 */

(function() {
    var gulp       = require('gulp');
    var connect    = require('gulp-connect');
    var concat     = require('gulp-concat');
    var uglify     = require('gulp-uglify');
    var rename     = require('gulp-rename');
    var minify_css = require('gulp-minify-css');
    var transport  = require("gulp-seajs-transport");
    var imagemin   = require('gulp-imagemin');
    var cache      = require('gulp-cache');
    var plumber    = require('gulp-plumber');
    var pages_names;

    // 压缩并合并css文件
    // ==========================
    gulp.task('min_css', function() {
      gulp.src(['./src/stylesheets/base/*.css', './src/stylesheets/helpers/*.css', './src/stylesheets/components/*.css'])
        .pipe(concat('common.min.css'))
        .pipe(minify_css())
        .pipe(gulp.dest('./dist/css'))
        .on('end', function() {
            gulp.src(['./src/stylesheets/pages/*.css'])
                .pipe(minify_css())
                .pipe(rename(function (path) {
                    path.basename += ".min";
                }))
                .pipe(gulp.dest('./dist/css'));

            gulp.src(['./src/fonts/**/*'])
                .pipe(gulp.dest('./dist/fonts'));
        });
    });

    // 压缩js文件
    // ==========================
    gulp.task('min_js', function() {
        gulp.src("./src/javascript/**/*.js")
            .pipe(transport())
            .pipe(uglify())
            .pipe(gulp.dest("./dist/javascript"));
    });

    // 压缩图片文件
    // ==========================
    gulp.task('image_min', function() {
        gulp.src('./src/images/**/*')
            .pipe(imagemin({
                optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
            }))
            .pipe(gulp.dest('./dist/images'));
    });

    // 监听图片文件
    // ==========================
    gulp.task('watch_images', function() {
        gulp.watch('./src/images/**/*', ['image_min']);
    });

    // 监听css文件变化
    // ==========================
    gulp.task('watch_css', function() {
      gulp.watch('./src/stylesheets/**/*.css', ['min_css']);
    });

    // 监听js文件变化
    // ==========================
    gulp.task('watch_js', function() {
      gulp.watch('./src/javascript/**/*.js', ['min_js']);
    });

    // 监听文件变化
    // ==========================
    gulp.task('watch', ['default', 'watch_css', 'watch_js', 'watch_images']);

    // 默认任务
    // ==========================
    gulp.task('default', ['min_css', 'min_js', 'image_min']);
})();