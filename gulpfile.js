var gulp = require('gulp'),
        // compass = require('gulp-compass'),      // compass编译Sass, 生成雪碧图
        sass = require('gulp-sass'),            //sass 预解析
        // sourcemaps = require('gulp-sourcemaps'),// sass地图
        // cssver = require('gulp-make-css-url-version'), // css文件引用URL加版本号
        // minifycss = require('gulp-minify-css'), // 压缩CSS
		jshint = require('gulp-jshint'),        // 语法检查
		uglify = require('gulp-uglify'),        // js 压缩
		// imagemin = require('gulp-imagemin'),    // 图片压缩
		// cache = require('gulp-cache'),          // 缓存通知
		connect = require('gulp-connect'),      // web服务
		clean = require('gulp-clean'),          // 清空文件夹
		rename = require('gulp-rename'),        // 重命名
		browserSync = require('browser-sync'),  // 浏览器同步
		reload = browserSync.reload;            // 自动刷新

// 路径变量
var path = {
    // 开发环境
    src: {
        js: 'src/js',
        sass: 'src/scss',
        image: 'src/images',
        fonts: 'src/fonts'
    },
    // 发布环境
    dist: {
        js: 'dist/js',
        css: 'dist/css',
        image: 'dist/images',
        fonts: 'dist/fonts'
    }
};

//定义web服务模块
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

// 定义web服务模块，增加浏览器同步浏览
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: '.'
        }
    });
});

// 创建Compass任务，编译Sass生成雪碧图
gulp.task('sass', function(){
  return gulp.src( path.src.sass + '/main.scss' )
    .pipe(sass())
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({stream: true}));
});
// gulp.task('compass', function() {
//     gulp.src( path.src.sass + '/main.scss' )
//         .pipe(compass({
//             config_file: './config.rb',    // 配置文件
//             css: path.src.css,             // 编译路径
//             sass: path.src.sass         　 // sass路径
//             //image: path.dev.image        // 图片路径，用于生成雪碧图
//         }))
//         .pipe(cssver())                    // CSS文件引用URl加版本号
//         .pipe(minifycss())                 // 压缩CSS
//         .pipe(gulp.dest(path.dist.css))    // 发布到线上版本
//         .pipe(reload({stream: true}));
// });

gulp.task('html', function () {
  gulp.src('html/*.html')
    .pipe(reload({stream: true}));
});


// 图片压缩
gulp.task('image', function() {
    gulp.src(path.src.image + '/*.*')
    // .pipe(cache(imagemin()))
    .pipe(reload({stream: true}))
    .pipe(gulp.dest( path.dist.image ));
});

// font icon
gulp.task('fonts', function() {
    gulp.src( path.src.fonts + '/**' )
    // .pipe(cache(imagemin()))
    .pipe(reload({stream: true}))
    .pipe(gulp.dest( path.dist.fonts ));
});

// 语法检查
gulp.task('jshint', function () {
	return gulp.src( path.src.js + '/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

// 压缩 js 文件
gulp.task('minify', function() {
    gulp.src( path.src.js + '/**/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest( path.dist.js ))
        .pipe(reload({stream: true}));
});

// 清空文件夹
gulp.task('clean', function() {
    gulp.src([path.dist.css, path.dist.js, path.dist.image], {read: false})
        .pipe(clean());
});

// 默认任务
gulp.task("default", function() {
  gulp.run('browser-sync', 'sass', 'minify', 'image', 'fonts');

  // 检测文件发送变化 - 分开监听为了执行对应的命令
  gulp.watch('html/*.html', ['html']);
  gulp.watch( path.src.sass + '/**/*.scss', ['sass']);
  gulp.watch(path.src.image+'/**', ['image']);
  gulp.watch( path.src.js + '/**/*.js', ['minify']);
  gulp.watch( path.src.fonts + '/', ['fonts']);

});