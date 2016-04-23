'use strict';

angular.module('registers').controller('RegistersCreateQuizController', ['$scope', '$stateParams', '$location', 'Authentication', 'RegistersService',
  function ($scope, $stateParams, $location, Authentication, RegistersService) {
    $scope.authentication = Authentication;

    $scope.cough = 0;
    $scope.breath = 0;
    $scope.sneezing = 0;
    $scope.wheezing = 0;
    $scope.nasal = 0;
    $scope.phlegm = 0;
    $scope.eyes = 0;
    $scope.snot = 0;

    $scope.minSlider = {
      value:0,
      options:{
        floor:0,
        ceil:4,
        step:1,
        precision: 1
      }
    }



    $scope.saveRegister = function(){
      // Create new register object
      var register = new RegistersService({
        sintomas: [{
          tos: $scope.cough,
          dificultadRespiratoria: $scope.breath,
          estornudos: $scope.sneezing,
          sibilancia: $scope.wheezing,
          obstruccionNasal: $scope.nasal,
          ardorOjos: $scope.eyes,
          catarro: $scope.phlegm,
          mucosidad: $scope.snot
        }],
        user: '',
        created_at: '',
        updated_at: '',
      });
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
