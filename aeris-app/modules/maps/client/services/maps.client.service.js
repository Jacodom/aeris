//Maps service used to communicate Maps REST endpoints
(function () {
  'use strict';

  angular
    .module('maps')
    .factory('MapsService', MapsService);

  MapsService.$inject = ['$resource'];

  function MapsService($resource) {
    return $resource('api/maps/:mapId', {
      mapId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
