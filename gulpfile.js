//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');  // web服务器
    less = require('gulp-less');

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')) //将会在src/css下生成index.css
        .pipe(livereload());
});
// 脚本
gulp.task('scripts', function() { 
  return gulp.src('src/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('src/dest'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('src/dest'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// 看守
gulp.task('watch', function() {
  livereload.listen();
	// 看守所有.scss档
  gulp.watch('src/less/**/*.less', ['testLess']);

  // 看守所有.js档
  gulp.watch('src/scripts/**/*.js', ['scripts']);
});

gulp.task('webserver', function() {
    connect.server({livereload: true});
});

gulp.watch('src/scripts/**/*.js', function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变 
    console.log(event.path); //变化的文件的路径
}); 


gulp.task('default',['testLess', 'scripts', 'webserver', 'watch']); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径