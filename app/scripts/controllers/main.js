'use strict';

angular.module('stringApp')
  .controller('MainCtrl', function ($scope, $location) {
        $scope.goNext = function (hash) {
            $location.path(hash);
        }
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

