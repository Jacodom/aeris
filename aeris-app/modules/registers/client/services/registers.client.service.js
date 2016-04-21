//Registers service used to communicate Registers REST endpoints
(function () {
  'use strict';

  angular
    .module('registers')
    .factory('RegistersService', RegistersService);

  RegistersService.$inject = ['$resource'];

  function RegistersService($resource) {
    return $resource('api/registers/:registerId', {
      registerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
