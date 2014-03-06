'use strict';

angular.module('stringApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'angularfire.firebase',
  'angularfire.login',
  'simpleLoginTools'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {

        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
//            resolve: {
//                user: function (userService) {
//                    return userService.get();
//                    console.log(user);
//                },
//                loggedInUser: function (userService) {
//                    return userService.getCurrentUser();
//                    console.log(loggedInUser);
//
//                }
//            }

    })
      .when('/login', {
//        authRequfalse false, // if true, must log in before viewing this page
        templateUrl: 'views/login.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
