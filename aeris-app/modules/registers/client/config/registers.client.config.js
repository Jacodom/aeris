(function () {
  'use strict';

  angular
    .module('registers')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Registers',
      state: 'registers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'registers', {
      title: 'List Registers',
      state: 'registers.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'registers', {
      title: 'Create Register',
      state: 'registers.create',
      roles: ['user']
    });
  }
})();
