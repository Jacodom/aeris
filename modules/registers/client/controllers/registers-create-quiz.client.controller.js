(function() {
  'use strict';

  angular
    .module('registers')
    .controller('RegistersCreateQuizController', RegistersCreateQuizController);

  RegistersCreateQuizController.$inject = ['$scope'];

  function RegistersCreateQuizController($scope) {
    var vm = this;

    // Registers create quiz controller logic
    // ...

    init();

    function init() {
    }
  }
})();
