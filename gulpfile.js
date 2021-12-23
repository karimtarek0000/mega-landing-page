// VARIABLES
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    liveReload = require('gulp-livereload'),
    cssMinify = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    sourceMaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    pug = require('gulp-pug'),
    clean = require('gulp-clean'),
    ftp = require('vinyl-ftp'),
    zip = require('gulp-zip'),
    notify = require('gulp-notify');
   
// VARABILES PLACE
var SCRIPTES_PATH = 'Pre-Production/js/**/*.js',
    STYLE_PATH = 'Pre-Production/sass/**/*.scss',
    IMAGE_PATH = 'Pre-Production/img/**/*.{png,jpg,jpeg,svg}',
    CSS_PATH = 'Pre-Production/css/**/*.css',
    PUG_PATH = 'Pre-Production/**/*.pug',
    DIST = 'dist';

// VARABLIES PLUGIN IMAGEMIN
var imagemin = require('gulp-imagemin'),
    imageminPngquat = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress');

/////////////////////////////////
/// ALL TASKS

// TASK SASS
gulp.task('style', () => {
    console.log('style running');
    return  gulp.src(STYLE_PATH)
           .pipe(plumber( function(error) {
                console.log('Style Task Error');
                console.log(error);
                this.emit('end');
           }))
           .pipe(sourceMaps.init())
           .pipe(sass({outputStyle: 'compressed'}))
           .pipe(sourceMaps.write())
           .pipe(rename('style.css'))
           .pipe(prefixer({ browsers: ['last 10 versions']}))
           .pipe(gulp.dest(DIST + '/css'))
           .pipe(liveReload())
});

// TASK MOVE FILES CSS
gulp.task('filesStyle', () => {
    return gulp.src(CSS_PATH)
            .pipe(cssMinify())
            .pipe(gulp.dest(DIST + '/css'))
            .pipe(liveReload())
});

// TASK JAVASCRIPT
gulp.task('compJs', () => {
    return gulp.src(SCRIPTES_PATH)
           .pipe(plumber(function(error) {
             console.log('Javascript Task Error');
             console.log(error);
             this.emit('end');
            }))
           .pipe(sourceMaps.init())
           .pipe(babel({
               presets: ['es2015']
            }))
           .pipe(uglify())
           .pipe(concat('js.js'))
           .pipe(sourceMaps.write())
           .pipe(gulp.dest(DIST + '/js'))
           .pipe(liveReload())
});

//

// TASK IMAGES COMPRESSIONS
gulp.task('image', function() {
    return gulp.src(IMAGE_PATH)
          .pipe(imagemin([
              imagemin.gifsicle(),
              imagemin.jpegtran(),
              imagemin.svgo(),
              imageminPngquat(),
              imageminJpegRecompress(),
          ]))
          .pipe(gulp.dest(DIST + '/img'))
          .pipe(notify('Image Compreseed is Done'))
})

// TASK HTML
gulp.task('html', () => {
    return gulp.src('Pre-Production/*.html')
           .pipe(gulp.dest('dist'))
           .pipe(liveReload())
           //.pipe(notify('Html is Done'))
});

// TASK PUG JS
gulp.task('compPug', () => {
    return gulp.src(PUG_PATH)
           .pipe(pug({pretty: true}))
           .pipe(gulp.dest('dist'))
           .pipe(liveReload())
});

// CLEAN ALL 
gulp.task('clean', () => {
    return gulp.src([IMAGE_PATH])
           .pipe(clean())
           .pipe(notify('Clean is Done'))
});

// COMPRESSED FILE TO ZIP
gulp.task('compressed', () => {
    return gulp.src(DIST + '/**/*.*')
           .pipe(zip('website.zip'))
           .pipe(gulp.dest('.'))
           .pipe(notify('Compressed is Done'))
});

// UPLOADE WEBSITE
gulp.task('deploy', function () {
 
    var conn = ftp.create({
        host:     'ftpupload.net',
        user:     'epiz_23608498',
        password: 'lJ2rZpksrB',
        parallel: 10,
    });
 
    return gulp.src(['dist/**/*.*'], { base: '.', buffer: false } )
        .pipe( conn.newer('/htdocs')) 
        .pipe( conn.dest('/htdocs'))
 
});

///////////////////////////////////////////////////////////////////////////////////
// TASKS WATCH
gulp.task('watch', () => {

   // Testing
   console.log('this is a running');

   // SERVER AND LIVERELOAD
   require('./server.js');
   liveReload.listen();

   // HTML.WATCH
   gulp.watch('Pre-Production/*.html', gulp.series('html'));

   // PUG.WATCH
   //gulp.watch(PUG_PATH, gulp.series('compPug'));

   // CSS FILES.WATCH
   gulp.watch(CSS_PATH, gulp.series('filesStyle'));
   
    // STYLE.WATCH
    gulp.watch(STYLE_PATH, gulp.series('style'));

   // SCRIPTES.WATCH
   gulp.watch(SCRIPTES_PATH, gulp.series('compJs') );

   // IMAGE.WATCH
   gulp.watch(IMAGE_PATH, gulp.series('image'));

});

///////////////////////////////////////////////////////////////////////////////////
// GULP RUNNING ALL TASKS 
gulp.task('default', gulp.parallel('html', 'style', 'compJs', 'watch'));



