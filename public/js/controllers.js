'use strict';

beerApp.controller('BeersCtrl', function ($scope, $http) {

  $http.get('api/beers/').success(function(beers) {
    $scope.beers = beers;
  });

});

beerApp.controller('EditCtrl', function ($scope, $http, $routeParams) {

  var beerId = $routeParams.id;

  $http.get('api/beers/' + beerId).success(function(beer) {
    $scope.beer = beer;
  });

});