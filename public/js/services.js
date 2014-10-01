'use strict';

beerApp.factory('Beer', function ($resource) {

    return $resource('api/beers/:id', {id: '@id'});

}).factory('Profile', function($http, sfReaccessService) {
  var _profilePromise = null;
  return {
    get: function() {
      if(_profilePromise) {
        return _profilePromise;
      }
      return _profilePromise = $http.get('/profile').then(function(response) {
        sfReaccessService.setRights(response.data.rights);
        sfReaccessService.setValues([{
          _username: response.data.username
        }]);
        return response.data;
      }, function() {
        _profilePromise = null;
      });
    }
  }
});
