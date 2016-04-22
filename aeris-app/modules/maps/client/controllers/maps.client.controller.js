(function () {
  'use strict';

  // Maps controller
  angular
    .module('maps')
    .controller('MapsController', MapsController);

  MapsController.$inject = ['$scope', '$state', 'Authentication', 'mapResolve'];

  function MapsController ($scope, $state, Authentication, map) {
    var vm = this;

    vm.authentication = Authentication;
    vm.map = map;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Map
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.map.$remove($state.go('maps.list'));
      }
    }

    // Save Map
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mapForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.map._id) {
        vm.map.$update(successCallback, errorCallback);
      } else {
        vm.map.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('maps.view', {
          mapId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
