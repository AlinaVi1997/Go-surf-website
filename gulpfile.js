gulp = require('gulp');
sass = require('gulp-sass')(require('sass'));
browserSync = require('browser-sync');
imagemin = require('gulp-imagemin');
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
rename = require ('gulp-rename'),
autoprefixer = require('gulp-autoprefixer'),
clean= require('gulp-rimraf'),

gulp.task('clean', function() {
      return gulp.src('dist', { allowEmpty: true })
        .pipe(clean());                     // очистка
    });

gulp.task('scss', function(){
      return gulp.src('app/scss/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                  overrideBrowserslist: ['Last 8 versions']}))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream:true}))
});

gulp.task('css',function (){
      return gulp.src([
      'node_modules/normalize.css/normalize.css', 
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/animate.css/animate.css',
])
      .pipe(concat('_libs.scss'))
      .pipe(gulp.dest('app/scss'))
      .pipe(browserSync.reload ( {stream: true}))
} );

gulp.task('html', function(){
     return  gulp.src('.html')
     .pipe(browserSync.reload({stream:true}))
});
gulp.task('script', function(){
      return  gulp.src('app/*js/.js')
      .pipe(browserSync.reload({stream:true}))
 });

gulp.task('js', function(){
      return gulp.src([
         'node_modules/slick-carousel/slick/slick.js ',

 ])
      .pipe(concat('libs.min.js' ))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(browserSync.reload ( {stream: true}))
});

gulp.task('browser-sync', function() {
      browserSync.init({
          server: {
              baseDir: "app/"
          }
      });
  });

gulp.task('export', async function(){

let buildHtml = gulp.src('**/*.html')
.pipe(gulp.dest('dist'))

let BuildCss = gulp.src('app/css/**/*.css')
.pipe(gulp.dest('dist/css'))

let BuildJs = gulp.src('app/js/**/*.js')
.pipe(gulp.dest('dist/js'))

let BuildImg = gulp.src('app/img/**/*.*')
.pipe(gulp.dest('dist/img'))


let buildFonts = gulp.src('app/fonts/**/*.*')
.pipe(gulp.dest('dist/fonts'))
});

gulp.task('watch',function(){
 gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
 gulp.watch ('*.html',gulp.parallel('html'))
 gulp.watch('app/js/*.js',gulp.parallel('script'))
});

gulp.task('build',gulp.series('clean','export' ));

gulp.task('default',gulp.parallel( 'css', 'scss', 'js', 'browser-sync', 'watch'));
