'use strict';

/**
 * @ngdoc overview
 * @name reepayApp
 * @description
 * # reepayApp
 *
 * Main module of the application.
 */
angular
  .module('reepayApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/customers', {
        templateUrl: 'views/customers.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/customers'
      });
  })
  .run(function ($http) {


    //Key goes here
    $http.defaults.headers.common.Authorization = 'Basic';

  });
