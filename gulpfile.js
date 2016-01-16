////////////////////////////////////////////////////////////////////////////////
/**
 * @name Gulp taskrunner
 * @desc The TickerTags dashboard taskrunner and build creator
 */

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    gulpif        = require('gulp-if'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-ruby-sass'),
    streamqueue   = require('streamqueue'),
    sourcemaps    = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    htmlReplace   = require('gulp-html-replace'),
    runSequence   = require('run-sequence'),
    stripDebug    = require('gulp-strip-debug'),
    del           = require('del'),
    es            = require('event-stream');

var config = {
    srcTemplates:[
        'app/**/*.html',
        'app/**/**/*.html',
        'app/dashboard.html',
        '!app/index.html'
    ],
    destPartials: 'app/templates/'
};

var paths = {
    scripts: [
        'app/**/*.js',
        'app/*.js']
};

var version = '';
var env = process.env.V; // V={version number} ie: V=1.0.1 gulp build

// Log Errors
function errorlog(err) {
    console.log(err.message);
    this.emit('end');
}

/** Build Tasks */
/** ------------------------------------------------------------------------- */
////////////////////////////////////////////////////////////////////////////////

gulp.task('version', function() {
    return printOut(env);
});

function printOut(ver) {
    version = ver;
    if (version === undefined) {
        version = '0.0.0';
    }
    console.log('Building version',version);
}

/** Main Gulp Tasks */
/** ------------------------------------------------------------------------- */
////////////////////////////////////////////////////////////////////////////////

/** HTML Template caching */
/** ------------------------------------------------------------------------- */
gulp.task('html-templates', function() {
    return gulp.src(config.srcTemplates)
    .pipe(templateCache('templateCache.js', { module:'templateCache', standalone:true })
    ).pipe(gulp.dest(config.destPartials));
});

/** Main App Angular Modules */
/** ------------------------------------------------------------------------- */
gulp.task('app-js', function() {
    return gulp.src(paths.scripts)
    .pipe(uglify())
    .on('error', errorlog)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('app/assets/js'));
});

/** Main Styles */
/** ------------------------------------------------------------------------- */
gulp.task('app-css', function() {
    return sass('bower_components/sass-smacss/sass/app.scss', {
        // noCache: true,
        style: 'compressed'
    })
    .pipe(sourcemaps.init())
    .on('error', errorlog)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app/assets/css/'))
});

/** Development watch */
/** ------------------------------------------------------------------------- */
gulp.task('watch', function() {
    gulp.watch('app/**/**/*.html', ['html-templates']).on('change', function(file) {
        gutil.log(gutil.colors.yellow.bold('HTML updated' + ' (' + file.path + ')'));
    });

    gulp.watch('bower_components/sass-smacss/sass/**/*.scss', ['app-css']).on('change', function(file) {
        gutil.log(gutil.colors.cyan.bold('CSS updated' + ' (' + file.path + ')'));
    });

    gulp.watch(paths.scripts, ['app-js']).on('change', function(file) {
        gutil.log(gutil.colors.red.bold('JavaScript updated' + ' (' + file.path + ')'));
    });
});
