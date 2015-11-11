/*!
 * =================================================
 * name: gulpfiles.js
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * =================================================
 */

(function() {
    var gulp = require('gulp');
    var connect = require('gulp-connect');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var minify_css = require('gulp-minify-css');
    var shelljs = require('shelljs');
    var transport = require("gulp-seajs-transport");
    var imagemin = require('gulp-imagemin');
    var cache = require('gulp-cache');
    var nano = require('gulp-cssnano');
    var pages_names;

    // 压缩并合并css文件
    // ==========================
    gulp.task('min_css', function() {
      gulp.src(['./src/stylesheets/base/*.css', './src/stylesheets/helpers/*.css', './src/stylesheets/components/*.css'])
        .pipe(concat('common.min.css'))
        .pipe(nano())
        .pipe(gulp.dest('./build/css'))
        .on('end', function() {
            pages_names = shelljs.ls('./src/stylesheets/pages');
            concat_pages(pages_names, function() {
                shelljs.rm('./build/css/common.min.css');
            });
        });
    });

    function concat_pages(pages_names, callback) {
        if(!pages_names.length) {
            callback();
            return;
        }
        var page_now = pages_names.pop();

        page_now = page_now.split('.')[0];

        gulp.src(['./build/css/common.min.css', './src/stylesheets/pages/' + page_now + '.css'])
            .pipe(concat(page_now + '.min.css'))
            .pipe(nano())
            .pipe(gulp.dest('./build/css'))
            .on('end', function() {
                concat_pages(pages_names, callback);
            });
    }

    // 压缩js文件
    // ==========================
    gulp.task('min_js', function() {
        gulp.src("./src/javascript/**/*.js")
            .pipe(transport())
            .pipe(uglify())
            .pipe(gulp.dest("./build/javascript"));
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
            .pipe(gulp.dest('./build/images'));
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

    // 发布版本
    // ==========================
    gulp.task('pub', function() {
        gulp.src(['./build/**/*'])
            .pipe(gulp.dest('./dist/'));
    });

    // 监听文件变化
    // ==========================
    gulp.task('watch', ['default', 'watch_css', 'watch_js', 'watch_images']);

    // 默认任务
    // ==========================
    gulp.task('default', ['min_css', 'min_js', 'image_min']);
})();