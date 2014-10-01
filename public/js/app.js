'use strict';

var beerApp = angular.module('beerApp', ['ngResource', 'ngRoute', 'simplifield.reaccess']);

beerApp.config(['$routeProvider', '$logProvider', 'sfReaccessServiceProvider',
  function($routeProvider, $logProvider, sfReaccessServiceProvider) {

	$routeProvider.
		when('/beers/', {
			templateUrl: 'partials/beers.html',
			controller: 'BeersCtrl',
			resolve: ['Profile', function(Profile) {
			  return Profile.get();
			}]
		}).
		when('/beers/create', {
            templateUrl: 'partials/edit.html',
            controller: 'EditCtrl',
			      resolve: ['Profile', function(Profile) {
			        return Profile.get();
			      }]
        }).
        when('/beers/:id', {
            templateUrl: 'partials/edit.html',
            controller: 'EditCtrl',
			      resolve: ['Profile', function(Profile) {
			        return Profile.get();
			      }]
        }).
		otherwise({
			redirectTo: '/beers/'
		});

    // Debugging rights
    $logProvider.debugEnabled(true);
    sfReaccessServiceProvider.debug(true);

    // Setting templated rights
    sfReaccessServiceProvider.setPredefinedRights({
      'BEER_ADD':  {
        path: '/beers',
        methods: ['POST']
      },
      'BEER_EDIT':{
        path: '/beers/:id',
        methods: ['PUT', 'PATCH']
      },
      'BEER_DELETE':  {
        path: '/beers/:id',
        methods: ['DELETE']
      }
    });
}]);
