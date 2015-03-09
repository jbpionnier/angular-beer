'use strict';

var beerApp = angular.module('beerApp', ['ngRoute']);

beerApp.config(function ($routeProvider) {

  $routeProvider.
      when('/beers/', {
        templateUrl: 'partials/beers.html',
        controller: 'BeersCtrl'
      }).
      when('/beers/:id', {
        templateUrl: 'partials/edit.html',
        controller: 'EditCtrl'
      }).
      otherwise({
        redirectTo: '/beers/'
      });

});