//Maps service used to communicate Maps REST endpoints
(function (google) {
  'use strict';

  angular
    .module('maps')
    .factory('MapsService', MapsService);

  MapsService.$inject = ['$resource'];
  function MapsService($resource) {
    var Mapster = (function(){
      function Mapster(element,opts){
        this.gMaps = new google.maps.Map(element,opts);
      }
      Mapster.prototype = {

      };
      return Mapster;
    }());
    Mapster.create = function(element,opts){
      return new Mapster(element,opts);
    };
    //windows.Mapster = Mapster;

    return $resource('api/maps/:mapId', {
      mapId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})(google);
