angular.module('myWeb', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/signin.html'
      })
      .when('/signup', {
        templateUrl: 'templates/signup.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
