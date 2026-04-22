module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: false,
    basePath: '../',
    frameworks: ['jasmine'],

    // Load only app scripts needed by the controller — skip jQuery/bootstrap/gaia
    // which require a full DOM environment that karma doesn't provide.
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'scripts/app.js',
      'scripts/controllers/main.js',
      'test/spec/**/*.js'
    ],

    browsers: ['ChromeHeadless'],
    plugins: ['karma-jasmine', 'karma-chrome-launcher'],
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
