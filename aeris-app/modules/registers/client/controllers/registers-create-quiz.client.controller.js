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



    $scope.minSlider = {
      value:0,
      options:{
        floor:0,
        ceil:4,
        step:1,
        precision: 1
      }
    };

    $scope.minSlider.cough = 0;
    $scope.minSlider.breath = 0;
    $scope.minSlider.sneezing = 0;
    $scope.minSlider.wheezing = 0;
    $scope.minSlider.nasal = 0;
    $scope.minSlider.phlegm = 0;
    $scope.minSlider.eyes = 0;
    $scope.minSlider.snot = 0;


    init();

    function init() {
    }
  }
})();
