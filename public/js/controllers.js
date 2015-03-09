'use strict';

beerApp.controller('BeersCtrl', function ($scope, Beer) {

  $scope.beers = Beer.query();

});


beerApp.controller('EditCtrl', function ($scope, $routeParams, Beer, $location) {

  var beerId = $routeParams.id;

  if (beerId) {
    Beer.get({id: beerId}, function (beer) {
      $scope.beer = beer;
    });
  } else {
    $scope.beer = new Beer();
  }


  $scope.update = function (beer) {
    if (!beer.name) {
      $scope.error = {message: 'Name is required'};
      return;
    }

    beer.$save(function () {
      $location.path('/beer');
    });
  };

  $scope.delete = function (beer) {
    beer.$delete(function () {
      $location.path('/beer');
    });
  };
});