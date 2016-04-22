(function () {
  'use strict';

  angular
    .module('maps')
    .controller('MapsListController', MapsListController);

  MapsListController.$inject = ['MapsService'];

  function MapsListController(MapsService) {
    var vm = this;

    vm.maps = MapsService.query();
  }
})();
