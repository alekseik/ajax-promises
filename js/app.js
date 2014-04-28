'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'techtalkServices'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/all', {templateUrl: 'partials/partial1.html', controller: 'AllTechtalksCtrl'});
  $routeProvider.when('/add', {templateUrl: 'partials/partial2.html', controller: 'AddTechtalkCtrl'});
  $routeProvider.otherwise({redirectTo: '/all'});
}]);
