const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const clean = require('gulp-clean');
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const paths = {
  sass: "./src/sass/**/*.scss",
  js: "./src/js/**/*.js",
  img: "./src/img/**/*",
  dist: "./dist/*",
  sassDest: "./dist/css",
  jsDest: "./dist/js",
  imgDest: "./dist/img",
};

function sassCompiler(cb) {
  src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.sassDest));
  cb();
}

function javaScript(cb) {
  src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest(paths.jsDest));
  cb();
}

function convertImages(cb) {
  src(paths.img)
    .pipe(imagemin())
    .pipe(dest(paths.imgDest));
  cb();
}

function cleanDist(cb) {
  src(paths.dist, {read: false})
    .pipe(clean());
  cb();
}

function startBrowserSync(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  cb();
}

function watchForChanges(cb) {
  watch("./*.html").on("change", reload);
  watch([paths.sass, paths.js], parallel(sassCompiler, javaScript)).on("change", reload);
  watch(paths.img, convertImages).on("change", reload);;
  cb();
}

const mainFunction = parallel(sassCompiler, javaScript, convertImages);
exports.cleanDist = cleanDist;
exports.default = series(mainFunction, startBrowserSync, watchForChanges);