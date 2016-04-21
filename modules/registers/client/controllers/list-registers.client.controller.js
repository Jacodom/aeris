(function () {
  'use strict';

  angular
    .module('registers')
    .controller('RegistersListController', RegistersListController);

  RegistersListController.$inject = ['RegistersService'];

  function RegistersListController(RegistersService) {
    var vm = this;

    vm.registers = RegistersService.query();
  }
})();
