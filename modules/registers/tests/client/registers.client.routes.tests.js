(function () {
  'use strict';

  describe('Registers Route Tests', function () {
    // Initialize global variables
    var $scope,
      RegistersService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RegistersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RegistersService = _RegistersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('registers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/registers');
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
          RegistersController,
          mockRegister;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('registers.view');
          $templateCache.put('modules/registers/client/views/view-register.client.view.html', '');

          // create mock Register
          mockRegister = new RegistersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Register Name'
          });

          //Initialize Controller
          RegistersController = $controller('RegistersController as vm', {
            $scope: $scope,
            registerResolve: mockRegister
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:registerId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.registerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            registerId: 1
          })).toEqual('/registers/1');
        }));

        it('should attach an Register to the controller scope', function () {
          expect($scope.vm.register._id).toBe(mockRegister._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/registers/client/views/view-register.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RegistersController,
          mockRegister;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('registers.create');
          $templateCache.put('modules/registers/client/views/form-register.client.view.html', '');

          // create mock Register
          mockRegister = new RegistersService();

          //Initialize Controller
          RegistersController = $controller('RegistersController as vm', {
            $scope: $scope,
            registerResolve: mockRegister
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.registerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/registers/create');
        }));

        it('should attach an Register to the controller scope', function () {
          expect($scope.vm.register._id).toBe(mockRegister._id);
          expect($scope.vm.register._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/registers/client/views/form-register.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RegistersController,
          mockRegister;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('registers.edit');
          $templateCache.put('modules/registers/client/views/form-register.client.view.html', '');

          // create mock Register
          mockRegister = new RegistersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Register Name'
          });

          //Initialize Controller
          RegistersController = $controller('RegistersController as vm', {
            $scope: $scope,
            registerResolve: mockRegister
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:registerId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.registerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            registerId: 1
          })).toEqual('/registers/1/edit');
        }));

        it('should attach an Register to the controller scope', function () {
          expect($scope.vm.register._id).toBe(mockRegister._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/registers/client/views/form-register.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
