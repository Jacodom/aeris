(function () {
  'use strict';

  angular
    .module('registers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('registers', {
        abstract: true,
        url: '/registers',
        template: '<div id="signup-form"><div id="steps-views" ui-view></div></div>'
      })
      .state('registers.list', {
        url: '',
        templateUrl: 'modules/registers/client/views/list-registers.client.view.html',
        controller: 'RegistersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Registers List'
        }
      })
      .state('quiz', {
        url: '/quiz',
        abstract: true,
        templateUrl: 'modules/registers/client/views/quiz-base.html',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Registers Create Quiz'
        }
      })
      .state('quiz.start', {
        url: '/start',
        templateUrl: 'modules/registers/client/views/start.client.view.html',
        controller: 'RegistersCreateQuizController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Start the quiz'
        }
      })
      .state('quiz.step-one', {
        url: '/step-one',
        templateUrl: 'modules/registers/client/views/step-one.client.view.html',
        controller: 'RegistersCreateQuizController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Step one'
        }
      })
      .state('quiz.step-two', {
        url: '/step-two',
        templateUrl: 'modules/registers/client/views/step-two.client.view.html',
        controller: 'RegistersCreateQuizController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Step one'
        }
      })
      .state('quiz.finish', {
        url: '/finish',
        templateUrl: 'modules/registers/client/views/finish.client.view.html',
        controller: 'RegistersCreateQuizController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Step one'
        }
      })
      .state('quiz.thank-you', {
        url: '/thank-you',
        templateUrl: 'modules/registers/client/views/thank-you.client.view.html',
        controller: 'RegistersCreateQuizController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Step one'
        }
      })
      .state('registers.edit', {
        url: '/:registerId/edit',
        templateUrl: 'modules/registers/client/views/form-register.client.view.html',
        controller: 'RegistersController',
        controllerAs: 'vm',
        resolve: {
          registerResolve: getRegister
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Register {{ registerResolve.name }}'
        }
      })
      .state('registers.view', {
        url: '/:registerId',
        templateUrl: 'modules/registers/client/views/view-register.client.view.html',
        controller: 'RegistersController',
        controllerAs: 'vm',
        resolve: {
          registerResolve: getRegister
        },
        data:{
          pageTitle: 'Register {{ articleResolve.name }}'
        }
      });
  }

  getRegister.$inject = ['$stateParams', 'RegistersService'];

  function getRegister($stateParams, RegistersService) {
    return RegistersService.get({
      registerId: $stateParams.registerId
    }).$promise;
  }

  newRegister.$inject = ['RegistersService'];

  function newRegister(RegistersService) {
    return new RegistersService();
  }
})();
