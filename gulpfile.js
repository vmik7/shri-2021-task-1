let projectFolder = 'build';
let sourceFolder = 'src';

// let fs = require('fs');
// var path = require('path');

let mypath = {
    build: {
        html: projectFolder + '/',
        css: projectFolder + '/',
    },
    src: {
        html: sourceFolder + '/*.html',
        css: sourceFolder + '/scss/stories.scss',
    },
    watch: {
        html: sourceFolder + '/*.html',
        css: sourceFolder + '/scss/stories.scss',
        js: projectFolder + '/stories.js',
    },
    clean: [projectFolder + '/stories.css', projectFolder + '/*.html']
}

let { src, dest } = require('gulp');
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let del = require('del');
let scss = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let groupMedia = require('gulp-group-css-media-queries');

// let cleanCss = require('gulp-clean-css');
// let rename = require('gulp-rename');

// let svgSprite = require('gulp-svg-sprite');
// var svgstore = require('gulp-svgstore');
// var svgmin = require('gulp-svgmin');


function browserSyncFunction() {
    browserSync.init({
        server: {
            baseDir: './' + projectFolder + '/'
        },
        port: 8080,
        notify: false,
        online: true
    });
}

function html() {
    return src(mypath.src.html)
        .pipe(dest(mypath.build.html))
        .pipe(browserSync.stream());
}

function css() {
    return src(mypath.src.css)
        .pipe(scss({
            outputStyle: 'expanded'
        }))
        .pipe(groupMedia())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(dest(mypath.build.css))
        .pipe(browserSync.stream());
}

function js() {
    return src(mypath.watch.js)
        .pipe(browserSync.stream());
}

// gulp.task('svgSprite', function() {
//     return gulp.src([projectFolder + '/assets/images/map-columns-optimized/*.svg'])
//     .pipe(svgSprite({
//         mode: {
//             stack: {
//                 sprite: '../icons/icons.svg', // sprite file name
//                 example: true
//             }
//         }
//     }))
//     .pipe(dest(projectFolder + '/assets/images/'));
// });

// gulp.task('svgstore', function () {
//     return gulp
//         .src([projectFolder + '/assets/images/map-columns/*.svg'])
//         .pipe(svgmin(function (file) {
//             var prefix = path.basename(file.relative, path.extname(file.relative));
//             return {
//                 plugins: [{
//                     cleanupIDs: {
//                         prefix: prefix + '-',
//                         minify: true
//                     }
//                 }]
//             }
//         }))
//         .pipe(svgstore())
//         .pipe(gulp.dest(projectFolder + '/assets/images/'));
// });

function watchFiles() {
    gulp.watch([mypath.watch.html], html);
    gulp.watch([mypath.watch.css], css);
    gulp.watch([mypath.watch.js], js);
}

function clean() {
    return del(mypath.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html));
let watch = gulp.parallel(build, watchFiles, browserSyncFunction);

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;