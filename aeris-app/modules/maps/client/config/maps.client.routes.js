(function () {
  'use strict';

  angular
    .module('maps')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('maps', {
        abstract: true,
        url: '/maps',
        template: '<ui-view/>'
      })
      .state('maps.list', {
        url: '',
        templateUrl: 'modules/maps/client/views/list-maps.client.view.html',
        controller: 'MapsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Maps List'
        }
      })
      .state('maps.create', {
        url: '/create',
        templateUrl: 'modules/maps/client/views/form-map.client.view.html',
        controller: 'MapsController',
        controllerAs: 'vm',
        resolve: {
          mapResolve: newMap
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Maps Create'
        }
      })
      .state('maps.edit', {
        url: '/:mapId/edit',
        templateUrl: 'modules/maps/client/views/form-map.client.view.html',
        controller: 'MapsController',
        controllerAs: 'vm',
        resolve: {
          mapResolve: getMap
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Map {{ mapResolve.name }}'
        }
      })
      .state('maps.view', {
        url: '/:mapId',
        templateUrl: 'modules/maps/client/views/view-map.client.view.html',
        controller: 'MapsController',
        controllerAs: 'vm',
        resolve: {
          mapResolve: getMap
        },
        data:{
          pageTitle: 'Map {{ articleResolve.name }}'
        }
      });
  }

  getMap.$inject = ['$stateParams', 'MapsService'];

  function getMap($stateParams, MapsService) {
    return MapsService.get({
      mapId: $stateParams.mapId
    }).$promise;
  }

  newMap.$inject = ['MapsService'];

  function newMap(MapsService) {
    return new MapsService();
  }
})();
