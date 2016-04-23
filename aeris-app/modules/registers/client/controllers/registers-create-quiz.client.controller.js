'use strict';

angular.module('registers').controller('RegistersCreateQuizController', ['$scope', '$stateParams', '$location', 'Authentication', 'RegistersService',
  function ($scope, $stateParams, $location, Authentication, RegistersService) {
    $scope.authentication = Authentication;

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

    // Create new Article object
    var register = new RegistersService({
      sintomas: [{
        tos: $scope.minSlider.cough,
        dificultadRespiratoria: $scope.minSlider.breath,
        estornudos: $scope.minSlider.sneezing,
        sibilancia: $scope.minSlider.wheezing,
        obstruccionNasal: $scope.minSlider.nasal,
        ardorOjos: $scope.minSlider.eyes,
        catarro: $scope.minSlider.phlegm,
        mucosidad: $scope.minSlider.phlegm
      }],
      user: '',
      created_at: '',
      updated_at: '',
    });

    $scope.saveRegister = function(){
      register.$save(function (response) {

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }
  }
]);


//
//   angular
//     .module('registers')
//     .controller('RegistersCreateQuizController', RegistersCreateQuizController);
//
//   RegistersCreateQuizController.$inject = ['$scope'];
//
//   function RegistersCreateQuizController($scope) {
//     var vm = this;
//
//     // Registers create quiz controller logic
//     // ...
//
//
//
//     $scope.minSlider = {
//       value:0,
//       options:{
//         floor:0,
//         ceil:4,
//         step:1,
//         precision: 1
//       }
//     };
//
//     $scope.minSlider.cough = 0;
//     $scope.minSlider.breath = 0;
//     $scope.minSlider.sneezing = 0;
//     $scope.minSlider.wheezing = 0;
//     $scope.minSlider.nasal = 0;
//     $scope.minSlider.phlegm = 0;
//     $scope.minSlider.eyes = 0;
//     $scope.minSlider.snot = 0;
//
//     $scope.saveRegister = function(){
//
//     }
//
//     init();
//
//     function init() {
//     }
//   }
// })();
