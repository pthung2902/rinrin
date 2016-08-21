'use strict';

/**
 * @ngdoc overview
 * @name rinrinApp
 * @description
 * # rinrinApp
 *
 * Main module of the application.
 */
angular
  .module('rinrinApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-loading-bar',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/dashboard', {
        templateUrl: 'views/dashboard/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })

      .when('/dashboard/home', {
        templateUrl: 'views/dashboard/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })

      .when('/dashboard/blank', {
        templateUrl: 'views/pages/blank.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/dashboard/form', {
        templateUrl: 'views/form.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/dashboard/login', {
        templateUrl: 'views/pages/login.html'
      })

      .when('/dashboard/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl',
        controllerAs: 'chart'
      })    

      .when('/dashboard/table', {
        templateUrl: 'views/table.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/dashboard/panels-wells', {
        templateUrl: 'views/ui-elements/panels-wells.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/dashboard/notifications', {
        templateUrl: 'views/ui-elements/notifications.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/dashboard/buttons', {
        templateUrl: 'views/ui-elements/buttons.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/dashboard/typography', {
        templateUrl: 'views/ui-elements/typography.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/dashboard/grid', {
        templateUrl: 'views/ui-elements/grid.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

       .when('/dashboard/register', {
        templateUrl: 'views/pages/store-register.html',
        controller: 'StoreRegisterCtrl',
        controllerAs: 'storeRegisterCtrl'
      })          

      .otherwise({
        redirectTo: '/'
      });
  });

 
