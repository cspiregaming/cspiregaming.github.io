'use strict';

/**
 * @ngdoc overview
 * @name cSpireGamingWebApp
 * @description
 * # cSpireGamingWebApp
 *
 * Main module of the application.
 */
angular.module('cSpireGamingWebApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch'])

.filter('relativeTime', function () {
  return function (iso) {
    if (!iso) return '';
    var diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return new Date(iso).toLocaleDateString();
  };
})

.config(function ($routeProvider, $sceDelegateProvider, $locationProvider) {
    
    $locationProvider.hashPrefix('');

    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true,
            rewriteLinks: false
        });
    }
    else {
        $locationProvider.html5Mode(false);
    }
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .otherwise({
            redirectTo: '/'
        });

    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.google.com/**'
  ]);
});

//angular.module('cSpireGamingWebApp').config(['$locationProvider', function ($locationProvider) {
//
//
//}]);
