// Karma configuration
// Generated on Thu Jan 07 2016 13:58:15 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
     'client/lib/jquery/dist/jquery.js',
     'client/lib/angular/angular.js',
     'client/lib/angular-ui-router/release/angular-ui-router.js',
     'client/lib/angular-animate/angular-animate.min.js',
     'client/lib/angular-aria/angular-aria.min.js',
     'client/lib/angular-messages/angular-messages.min.js',
     'client/lib/angular-material/angular-material.js',
     'client/lib/angular-mocks/angular-mocks.js',
     'client/app/app.js',
     'client/app/core/app.modules.js',
     'client/app/core/app.controller.js',
     'client/app/**/*.js',
     'test/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        'client/app/**/*.js': ['coverage']
    },

    coverageReporter: {
        type : 'html',
        dir : 'test/unit/coverage/'
    },


    // test results reporter to use
    // available reporters: https://npmjs.org/browse/keyword/karma-spec-reporter
    reporters: ['spec','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
