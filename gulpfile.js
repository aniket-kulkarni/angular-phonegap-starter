var gulp = require('gulp');
var config = require('./config/gulp.config');
var args = require('yargs').argv;

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var util = require('gulp-util');
var print = require('gulp-print');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var server = require( 'gulp-develop-server' );
var bs = require( 'browser-sync' );
var taskListing = require( 'gulp-task-listing' );
var imageMin = require( 'gulp-imagemin' );
var htmlMin = require('gulp-htmlmin');
var angularTemplateCache = require( 'gulp-angular-templatecache' );
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var debug = require('gulp-debug');
var useref = require('gulp-useref');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');

var filter = require('gulp-filter');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var csscomb = require('gulp-csscomb');

var Server = require('karma').Server;
var exec = require('child_process').exec;

var gulpsync = require('gulp-sync')(gulp);


var serverOptions = {
  path: config.serverPath
};

gulp.task('build-web-dev',gulpsync.sync(['test','clean-dist-web']), function() {

    log('Build Web Dev');

    return gulp
            .src(config.devSrc,{ base: './client/' })
            .pipe(gulp.dest(config.distWeb));

});

gulp.task('build-app-dev',gulpsync.sync(['test','clean-dist-app','copy-phonegap-artifacts']), function() {

    log('Build App Dev');

    return gulp
            .src(config.devSrc,{ base: './client/' })
            .pipe(gulp.dest(config.distAppWww));

});

gulp.task('build-web-prod',gulpsync.sync(['test','clean-dist-web','images-dist-web']), function() {

    log('Build Web Prod');

    return createDist(config.distWeb);

});

gulp.task('build-app-prod',gulpsync.sync(['test','clean-dist-app','images-dist-app','copy-phonegap-artifacts']), function() {

    log('Build App Prod');

    return createDist(config.distAppWww);

});


gulp.task( 'serve-dev', function() {
    server.listen( serverOptions, function( error ) {
        if( ! error ) {
          startBrowserSync(true);
        }
    });
});


gulp.task( 'serve-dist-web',[], function() {

    log('Starting Node Server');

    serverOptions.env = {
      NODE_ENV: 'dist'
    };
    
    server.listen( serverOptions, function( error ) {
        if( ! error ) {
          startBrowserSync(false);
        }
    });
});

gulp.task( 'serve-dist-app',[], function(cb) {
    log('Starting PhoneGap Serve');

    var ls = exec('cd dist/app && phonegap serve');

    ls.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.log(`${data}`);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
});



gulp.task('test',['lint'], function (done) {
    return new Server({
      configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('lint',function() {

    log('Analyzing source files with jshint and jscs');

    return gulp
               .src([config.srcJs])
               .pipe(gulpif(args.verbose,print()))
               .pipe(jscs())
               .pipe(jscs.reporter())
               .pipe(jscs.reporter('fail'))
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish', {verbose : true} ))
               .pipe(jshint.reporter('fail'));
});


gulp.task('css',[],function() {

    log('Doing Autoprefixing to css files');

    return gulp
            .src([config.styles])
            .pipe(autoprefixer())
            .pipe(csscomb())
            .pipe(gulp.dest(config.stylesDir)); 
});

gulp.task('help',taskListing);

gulp.task('template-cache',['clean-temp'],function() {

    return gulp
          .src(config.htmlTemplates)
          .pipe(htmlMin({}))
          .pipe(angularTemplateCache(config.templateCache.file,config.templateCache.options))
          .pipe(gulp.dest(config.temp));
});

gulp.task('copy-phonegap-artifacts',['clean-dist-app'],function() {

    log('Copying phonegap artificats to dist');

    var wwwFilter = filter(['**/*.*', '!www']);

    gulp
        .src(config.phonegapArtifacts,{base : './phonegap_artifacts/'})
        .pipe(gulp.dest(config.distApp));     
});

gulp.task('images-dist-web',[],function() {
    log('Copying and Optimizing Images to dist');

    gulp
        .src([config.images])
        .pipe(imageMin({optimizationLevel : 4}))
        .pipe(gulp.dest(config.distWebImages));     
});

gulp.task('images-dist-app',[],function() {
    log('Copying and Optimizing Images to dist');

    gulp
        .src([config.images])
        .pipe(imageMin({optimizationLevel : 4}))
        .pipe(gulp.dest(config.distAppImages));     
});


gulp.task('clean-dist-web',function(done) {
    log('Cleaning Dist Web');
    var path = config.distWeb;
    clean(path,done);
});

gulp.task('clean-dist-app',function(done) {
    log('Cleaning Dist Web');
    var path = config.distApp;
    clean(path,done);
});

gulp.task('clean-temp',function(done) {
    log('Cleaning www');
    var path = config.temp;
    clean(path,done);
});

gulp.task('clean-images-dist-web',function(done) {
    log('Cleaning Dist Images');
    var path = config.distWebImages;
    clean(path,done);
});



function startBrowserSync(isDev) {

    if(args.nosync || bs.active) {
      return;
    }

    var filesToWatch = isDev ? config.appFiles : [];

    var options = {
          proxy: 'http://localhost:3659',
          port : 3001,
          files : filesToWatch,
          reloadDelay : 600,
          notify : false,
          injectChanges : true
      };

    bs(options);  

}

function createDist(dest) {

  var templateCacheFile = config.temp + config.templateCache.file; 
  var cssFilter = filter('**/*.css',{restore : true});
  var jsFilter = filter('**/*.js',{restore : true});
  var htmlFilter = filter(['**/*.js','**/*.css'],{restore : true});
  
  return  gulp
            .src(config.index)  
            .pipe(plumber())
            .pipe(inject(gulp.src(templateCacheFile, {read : false}), {
              starttag : '<!-- inject:templates:js -->',
              ignorePath: '/client',
              addRootSlash: false
            }))
            .pipe(useref())
            .pipe(cssFilter)
            .pipe(csso())
            .pipe(cssFilter.restore)
            .pipe(jsFilter)
            .pipe(uglify())
            .pipe(jsFilter.restore)
            .pipe(htmlFilter)
            .pipe(rev())
            .pipe(htmlFilter.restore)
            .pipe(revReplace())
            .pipe(gulp.dest(dest))
            .pipe(rev.manifest())
            .pipe(gulp.dest(dest));

}

function log(msg) {
    util.log(util.colors.yellow(msg));
}

function clean(path,done) {
    log('Cleaning: '+path);
    del(path).then(function (paths) {
        log('Cleaning Done');
        done();
    });
}

