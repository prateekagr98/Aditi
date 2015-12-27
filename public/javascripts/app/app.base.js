var syncApp = angular.module('syncApp', ['ui.router', 'ngResource']);

syncApp.config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('base', {
        url: '/',
        views: {
          'category': {
            templateUrl: '/javascripts/app/templates/category.html'
          },
          'sidebar': {
            templateUrl: '/javascripts/app/templates/sidebar.html'
          }
        }
      })

    $urlRouterProvider.otherwise("/");

  }
])