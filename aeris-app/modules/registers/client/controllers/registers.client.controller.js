(function () {
  'use strict';

  // Registers controller
  angular
    .module('registers')
    .controller('RegistersController', RegistersController);

  RegistersController.$inject = ['$scope', '$state', 'Authentication', 'registerResolve'];

  function RegistersController ($scope, $state, Authentication, register) {
    var vm = this;

    vm.authentication = Authentication;
    vm.register = register;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Register
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.register.$remove($state.go('registers.list'));
      }
    }

    // Save Register
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.registerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.register._id) {
        vm.register.$update(successCallback, errorCallback);
      } else {
        vm.register.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('registers.view', {
          registerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
