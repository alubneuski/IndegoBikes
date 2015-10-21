'use strict';

/**
 * @ngdoc overview
 * @name indegoUiApp
 * @description
 * # indegoUiApp
 *
 * Main module of the application.
 */
angular
  .module('indegoUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'indegoServices',
    'BikeControllers'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/bikeUsage', {
        templateUrl: 'views/bikeUsage.html',
        controller: 'BikeUsageController',
        controllerAs: 'bikeUsage'
      })
      .when('/details/:kioskId', {
        templateUrl: 'views/details.htm',
        controller: 'BikeDetailController',
        controllerAs: 'bikeUsage'
      })
      .when('', {
        templateUrl: 'views/phillyTrendz',
        controller: 'PhillyTrendzCtrl',
        controllerAs: 'phillyTrendz'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
