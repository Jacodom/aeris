'use strict';

angular.module('appApp.auth', [
  'appApp.constants',
  'appApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
