/*global module:false*/
module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
          common: {
            src: './js/common.src.js',//压缩源文件是之前合并的risk.js文件  
            dest: './js/common.js'//压缩文件为risk.min.js  
          },
          base: {
            src: './js/4jdapp/base.src.js',
            dest: './js/4jdapp/base.js'
          },
          detail: {
            src: './js/4jdapp/v2/detail.v2.src.js',
            dest: './js/4jdapp/v2/detail.v2.js'
          },
          index: {
            src: './js/4jdapp/v2/index.v2.src.js',
            dest: './js/4jdapp/v2/index.v2.js'
          }
    },
    cssmin: {
        shanggou_m: {  
          src: './css/shanggou_m.src.css',//将之前的risk.css  
          dest: './css/shanggou_m.css'  //压缩  
        },
        quicksale: {  
          src: './css/pad/quicksale.src.css',//将之前的risk.css  
          dest: './css/pad/quicksale.s.css'  //压缩  
        }
     }
  });
 
  // 载入要使用的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // 注册任务
  grunt.registerTask('default', ['uglify', 'cssmin']);
 
};