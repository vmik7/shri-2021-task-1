let projectFolder = 'build';
let sourceFolder = 'src';

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

let fs = require('fs');

let path = {
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
let cleanCss = require('gulp-clean-css');
let rename = require('gulp-rename');

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
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(scss({
            outputStyle: 'expanded'
        }))
        .pipe(groupMedia())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream());
}

function js() {
    return src(path.watch.js)
        .pipe(browserSync.stream());
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html));
let watch = gulp.parallel(build, watchFiles, browserSyncFunction);

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;