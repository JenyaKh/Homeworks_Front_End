const { series, parallel, src, dest} = require('gulp');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');

function cleanDist() {
    return src('dist/*', {read : false}).pipe(clean());
}

function copyHtml(){
    return src('./src/index.html').pipe(dest('./dist'));
}

function copyCss(){
    return src('./src/**/*.css').pipe(dest('./dist/css'));
}

function copyJs(){
    return src('./src/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(dest('./dist/js'));
}


module.exports = {
build: series(cleanDist, parallel(copyHtml, copyCss, copyJs)),
};