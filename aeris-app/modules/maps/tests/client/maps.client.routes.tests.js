(function () {
  'use strict';

  describe('Maps Route Tests', function () {
    // Initialize global variables
    var $scope,
      MapsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _MapsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MapsService = _MapsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('maps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/maps');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          MapsController,
          mockMap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('maps.view');
          $templateCache.put('modules/maps/client/views/view-map.client.view.html', '');

          // create mock Map
          mockMap = new MapsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Map Name'
          });

          //Initialize Controller
          MapsController = $controller('MapsController as vm', {
            $scope: $scope,
            mapResolve: mockMap
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:mapId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.mapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            mapId: 1
          })).toEqual('/maps/1');
        }));

        it('should attach an Map to the controller scope', function () {
          expect($scope.vm.map._id).toBe(mockMap._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/maps/client/views/view-map.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MapsController,
          mockMap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('maps.create');
          $templateCache.put('modules/maps/client/views/form-map.client.view.html', '');

          // create mock Map
          mockMap = new MapsService();

          //Initialize Controller
          MapsController = $controller('MapsController as vm', {
            $scope: $scope,
            mapResolve: mockMap
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.mapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/maps/create');
        }));

        it('should attach an Map to the controller scope', function () {
          expect($scope.vm.map._id).toBe(mockMap._id);
          expect($scope.vm.map._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/maps/client/views/form-map.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MapsController,
          mockMap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('maps.edit');
          $templateCache.put('modules/maps/client/views/form-map.client.view.html', '');

          // create mock Map
          mockMap = new MapsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Map Name'
          });

          //Initialize Controller
          MapsController = $controller('MapsController as vm', {
            $scope: $scope,
            mapResolve: mockMap
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:mapId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.mapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            mapId: 1
          })).toEqual('/maps/1/edit');
        }));

        it('should attach an Map to the controller scope', function () {
          expect($scope.vm.map._id).toBe(mockMap._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/maps/client/views/form-map.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
