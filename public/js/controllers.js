'use strict';

beerApp.controller('BeersCtrl', function ($scope, $http) {

	$http.get('api/beers').success(function(beers) {
		$scope.beers = beers;
	});

});