const {src, dest, watch, series} = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const terser = require('gulp-terser')
const cssnano = require('cssnano')
const browserSync = require('browser-sync').create()

function compileSCSS(){
    return src('./scss/main.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('../build/css', {sourcemaps: '.'}))
}

function compileJS(){
    return src('./js/app.js', {sourcemaps: true})
        .pipe(terser())
        .pipe(dest('../build/js', {sourcemaps: '.'}))
}

function syncServe(cb){
    browserSync.init({
        server:{
            baseDir: '../build'
        }
    })
    cb()
}

function syncReload(cb){
    browserSync.reload()
    cb()
}

function watcher(){
    watch('../build/*.html', syncReload)
    watch(['./scss/**/*.scss', './js/app.js'], series(compileSCSS, compileJS, syncReload))
}

exports.default = series(compileSCSS, compileJS, syncServe, syncReload, watcher)