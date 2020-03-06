var gulp = require('gulp'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    cssnano = require("gulp-cssnano"),
    spritesmith  = require('gulp.spritesmith'),
    //pug = require('gulp-pug'),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    uglify = require("gulp-uglify"),
    merge = require('merge-stream'),
    plumber = require('gulp-plumber'),
    webp = require('gulp-webp');


var paths = {
    dirs: {
      build: './build'
    },
    html: {
      src: './src/pages/*.html',
      dest: './build',
      watch: ['./src/pages/*.html', './src/templates/*.html', './src/blocks/**/*.html']
    },
    css: {
        src: './src/sass/style.scss',
        dest: './build/css',
        watch: ['./src/blocks/**/*.scss', './src/sass/*.scss', './src/sass/global/*.scss']
    },
    all_css: {
        src: './src/sass/libs-style.scss',
        dest: './build/css',
        watch: './src/sass/libs-style.scss'
    },
    js: {
        src: './src/js/libs.js',
        //dest: './build/js',
        //dest: './src/js',
        //watch: './src/blocks/**/*.js',
        watch: './src/js/libs.js',
        //watchPlugins: './src/libs/**/*.js'
    },
    all_js: {
        src: './src/js/**/*.js',
        dest: './build/js',
        //dest: './src/js',
        watch: './src/js/**/*.js'
    },
    images: {
        src: 'src/img/**/*.+(jpg|jpeg|png|svg|gif)',
        dest: './build/img',
        watch: ['src/img/**/*.+(jpg|jpeg|png|svg|gif)']
    },
    fonts: {
      src: './src/fonts/*',
      dest: './build/fonts',
      watch: './src/fonts/*'
    },
    php_files: {
        src: './src/*.php',
        dest: './build',
        watch: './src/*.php'
    },
    files: {
        src: './src/files/*',
        dest: './build/files',
        watch: './src/files/*'
    }
};

gulp.task('clean', function () {
    return del(paths.dirs.build);
});

gulp.task('templates', function () {
    return gulp.src(paths.html.src)
        .pipe(rigger())
        .pipe(plumber())
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.reload({
          stream: true
      }));
});

gulp.task('styles', function () {
    return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    //.pipe(sass())
    .pipe(sass({
        indentType: 'tab',
        indentWidth: 1,
        outputStyle: 'expanded' // Expanded so that our CSS is readable
    })).on('error', sass.logError)
    //.pipe(cssnano())
    .pipe(autoprefixer({
        //browsers: ['last 2 versions'],
        //browsers: ['ie 10', 'ie 11'],
        overrideBrowserslist:  ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.reload({
        stream: true
  }));
});
gulp.task('libcss', function () {
    return gulp.src(paths.all_css.src)
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest(paths.all_css.dest))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/libs.js")
    .pipe(rigger())
    //.pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(uglify())
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("build/js"));
    //.pipe(gulp.dest(paths.js.dest));
});
gulp.task('all-scripts', function () {
    return gulp.src(paths.all_js.src)
    .pipe(rigger())
    .pipe(plumber())
    .pipe(gulp.dest("build/js"));
    //.pipe(gulp.dest(paths.js.dest));
});

gulp.task('images', function () {
    return gulp.src(paths.images.src)
    //.pipe(plumber())
    //.pipe(webp())
    .pipe(imagemin())
    /*.pipe(rename({
        dirname: ''
    }))*/
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('sprite', function () {
    var spriteData =
        gulp.src('src/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 1,
                imgPath: '../img/sprite.png',
                //cssTemplate: 'scss.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    //.pipe(buffer())
    //.pipe(imagemin())
        .pipe(gulp.dest('build/img/'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
    //.pipe(csso())
        .pipe(gulp.dest('src/sass/'));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);

});

gulp.task('php_post', function () {
    return gulp.src(paths.php_files.src)
    .pipe(gulp.dest(paths.php_files.dest))
    .pipe(browserSync.reload({
        stream: true
    }));
});
gulp.task('up-files', function () {
    return gulp.src(paths.files.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.files.dest))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// post
/*var post = gulp.src("src/*.php")
    .pipe(gulp.dest('build/'))*/

gulp.task('server', function () {
    browserSync.init({
        server: {
          baseDir: paths.dirs.build
        },
        reloadOnRestart: true
        //tunnel: 'remote'
    });
    gulp.watch(paths.html.watch,{usePolling: true}, gulp.parallel('templates'));
    gulp.watch(paths.css.watch,{usePolling: true}, gulp.parallel('styles'));
    gulp.watch(paths.all_css.watch,{usePolling: true}, gulp.parallel('libcss'));
    gulp.watch(paths.all_js.watch,{usePolling: true}, gulp.parallel('all-scripts'));
    gulp.watch(paths.js.watch,{usePolling: true}, gulp.parallel('scripts'));
    gulp.watch(paths.images.watch,{usePolling: true}, gulp.parallel('images'));
    gulp.watch(paths.fonts.watch,{usePolling: true}, gulp.parallel('fonts'));
    gulp.watch(paths.files.watch, gulp.parallel('up-files'));
    gulp.watch(paths.php_files.watch, gulp.parallel('php_post'));
});


gulp.task('build', gulp.series(
    'clean',
    'templates',
    'styles',
    'libcss',
    'sprite',
    'all-scripts',
    'scripts',
    'images',
    'fonts',
    'php_post',
    'up-files'
));

gulp.task('dev', gulp.series(
    'build', 'server'
));