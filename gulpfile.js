import gulp from 'gulp'
import {emptyDir} from 'fs-extra'
import htmlmin from 'gulp-htmlmin'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import autoprefixer from 'gulp-autoprefixer'
import image from 'gulp-image'
import babelify from 'babelify'
import bro from 'gulp-bro'
import uglify from 'gulp-uglify'
import browserSync from 'browser-sync'

const routes = {
  html: {
    src: 'src/*.html',
    dest: 'dist',
    watch: 'src/**/*.html',
  },
  scss: {
    src: 'src/scss/style.scss',
    dest: 'dist',
    watch: 'src/**/*.scss'
  },
  js: {
    src: 'src/js/main.js',
    dest: 'dist',
    watch: 'src/**/*.js'
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets'
  },
  fonts: {
    src: 'src/assets/fonts/*',
    dest: 'dist/assets/fonts'
  },
  img: {
    src: 'src/assets/img/*',
    dest: 'dist/assets/img'
  }
}

const clear = () => emptyDir('dist')

//--------------------------HTML--------------------------
const html = () => {
  return gulp.src(routes.html.src)
  .pipe(gulp.dest(routes.html.dest))
}

const htmlProd = () => {
  return gulp.src(routes.html.src)
  .pipe(htmlmin({collapseWhitespace: true}))  
  .pipe(gulp.dest(routes.html.dest))
}

//--------------------------SCSS--------------------------
const scss = () => {
  return gulp.src(routes.scss.src)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(routes.scss.dest))
}

const scssProd = () => {
  return gulp.src(routes.scss.src)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest(routes.scss.dest))
}

//--------------------------JS--------------------------
const js = () => {
  return gulp.src(routes.js.src)
  .pipe(bro({
    transform: [babelify.configure({presets: ['@babel/preset-env']})]
  }))
  .pipe(gulp.dest(routes.js.dest))
}

const jsProd = () => {
  return gulp.src(routes.js.src)
  .pipe(bro({
    transform: [babelify.configure({presets: ['@babel/preset-env']})]
  }))
  .pipe(uglify())
  .pipe(gulp.dest(routes.js.dest))
}

//--------------------------Assets, img, fonts--------------------------
const assets = () => {
  return gulp.src(routes.assets.src)
  .pipe(gulp.dest(routes.assets.dest))
}

const fonts = () => {
  return gulp.src(routes.fonts.src)
  .pipe(gulp.dest(routes.fonts.dest))
}

const img = () => {
  return gulp.src(routes.img.src)
  .pipe(image())
  .pipe(gulp.dest(routes.img.dest))
}

//--------------------------BrowserSync--------------------------

const browsersync = () => {
  browserSync.init({
    server: './dist',
    notify: false,
  })
}

//--------------------------Other--------------------------
const watch = () => {
  gulp.watch(routes.html.watch, html).on('change', browserSync.reload)
  gulp.watch(routes.scss.watch, scss).on('change', browserSync.reload)
  gulp.watch(routes.js.watch, js).on('change', browserSync.reload)
} 

const postDev = gulp.parallel(watch, browsersync)
const dev = gulp.series([clear, html, scss, js, assets, postDev])
gulp.task('default', dev)
export const prod = gulp.series([clear, htmlProd, scssProd, jsProd, fonts, img])
