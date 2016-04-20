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
        template: '<ui-view/>'
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
      .state('registers.create', {
        url: '/create',
        templateUrl: 'modules/registers/client/views/form-register.client.view.html',
        controller: 'RegistersController',
        controllerAs: 'vm',
        resolve: {
          registerResolve: newRegister
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Registers Create'
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
