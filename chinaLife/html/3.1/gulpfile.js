/*!
 * =================================================
 * name: gulpfiles.js
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * =================================================
 */

(function() {
    var gulp       = require('gulp');
    var concat     = require('gulp-concat');
    var uglify     = require('gulp-uglify');
    var rename     = require('gulp-rename');
    var minify_css = require('gulp-minify-css');
    var transport  = require("gulp-seajs-transport");
    var imagemin   = require('gulp-imagemin');
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

    // 压缩首页js文件
    // ==========================
    gulp.task('min_index_js', function() {
        gulp.src(["./src/javascript/index/*.js", "./src/javascript/common/*.js"], {base:"./src/javascript"})
            .pipe(transport())
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest("./dist/javascript/index"));
    });

    // 压缩即将特卖js文件
    // ==========================
    gulp.task('min_special_js', function() {
        gulp.src(["./src/javascript/special/*.js", "./src/javascript/common/*.js"], {base:"./src/javascript"})
            .pipe(transport())
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest("./dist/javascript/special"));
    });

    // 压缩商品页js文件
    // ==========================
    gulp.task('min_detail_js', function() {
        gulp.src(["./src/javascript/goods_list/*.js", "./src/javascript/common/*.js"], {base:"./src/javascript"})
            .pipe(transport())
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest("./dist/javascript/goods_list"));
    });

    // 压缩librayjs文件
    // ==========================
    gulp.task('min_libray_js', function() {
        gulp.src(["./lib/iscroll-probe.min.js", "./lib/sea.js", "./lib/zepto.min.js"])
            .pipe(concat('libray.js'))
            .pipe(gulp.dest("./lib"));
    });

    // 压缩辅助js
    // ==========================
    gulp.task('min_assist', function() {
        gulp.src(["./assist.js"])
            .pipe(uglify())
            .pipe(rename(function (path) {
                path.basename += ".min";
            }))
            .pipe(gulp.dest("./dist/javascript/"));
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
      gulp.watch('./src/javascript/**/*.js', ['min_index_js', 'min_detail_js', 'min_special_js']);
    });

    // 监听辅助js
    // ==========================
    gulp.task('watch_assist', function() {
      gulp.watch('./assist.js', ['min_assist']);
    });

    // 监听文件变化
    // ==========================
    gulp.task('watch', ['default', 'watch_css', 'watch_js', 'watch_images', 'watch_assist']);

    // 默认任务
    // ==========================
    gulp.task('default', ['min_css', 'min_index_js', 'min_detail_js', 'min_special_js', 'min_libray_js', 'min_assist', 'image_min']);
})();
