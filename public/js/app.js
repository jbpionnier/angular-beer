'use strict';

var beerApp = angular.module('beerApp', ['ngResource', 'ngRoute']);

beerApp.config(function ($routeProvider) {

  $routeProvider.
      when('/beers/', {
        templateUrl: 'partials/beers.html',
        controller: 'BeersCtrl'
      }).
      when('/beers/create', {
        templateUrl: 'partials/edit.html',
        controller: 'EditCtrl'
      }).
      when('/beers/:id', {
        templateUrl: 'partials/edit.html',
        controller: 'EditCtrl'
      }).
      otherwise({
        redirectTo: '/beers/'
      });
});