/**
 * Created by Administrator on 2018/2/6.
 */
//引包
var gulp = require("gulp");
var sass = require("gulp-sass");
//建任务
gulp.task("copy-html",function(){
    gulp.src("html/**/*")
        .pipe(gulp.dest("..\\src\\public\\html"));
});
gulp.task("copy-img",function(){
    gulp.src("img/**/*")
        .pipe(gulp.dest("..\\src\\public\\img"));
});
gulp.task("sassfile",function(){
    gulp.src("sass/**/*")
        .pipe(sass())
        .pipe(gulp.dest("..\\src\\public\\css"));
});
gulp.task("copy-js",function(){
    gulp.src("js/**/*")
        .pipe(gulp.dest("..\\src\\public\\js"));
});

//监听
gulp.task("watchall",function(){
    gulp.watch("html/**/*",["copy-html"]);
    gulp.watch("img/**/*",["copy-img"]);
    gulp.watch("js/**/*",["copy-js"]);
    gulp.watch("sass/**/*",["sassfile"]);
});
