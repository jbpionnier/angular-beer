'use strict';

beerApp.directive('myBeer', function() {
  return {
    scope: {
      beer: '='
    },
    templateUrl: './partials/my-beer.html'
  };
});