'use strict';

angular.module('stringApp')
  .controller('MainCtrl', function($scope, simpleLogin, $location, $rootScope, $firebase) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        simpleLogin.init(function(){

        });
        ////////Login Athentication\\\\\\\\\\\\
        $scope.pass = null;
        $scope.err = null;
        $scope.email = null;
        $scope.confirm = null;
        $scope.createMode = false;
        $scope.loginPassword = function(cb) {
            $scope.err = null;
            if( !$scope.email ) {
                $scope.err = 'Please enter an email address';
            }
            else if( !$scope.pass ) {
                $scope.err = 'Please enter a password';
            }
            else {
                simpleLogin.loginPassword($scope.email, $scope.pass, function(err, user) {
                    console.log(user);




                    $scope.err = err? err + '' : null;
                    if( !err && cb ) {
                        cb(user);
                    }
                });
            }
        };//end login authentication

        $scope.logout = simpleLogin.logout;


        $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
            if(user){
                $rootScope.user=user;
                var listRef = new Firebase('https://string.firebaseio.com/users/'+$rootScope.user.id);
                $scope.list = $firebase(listRef);
            }

        });
        ////////Create Account\\\\\\\\\\\\

        $scope.createAccount = function() {
            function assertValidLoginAttempt() {
                if( !$scope.email ) {
                    $scope.err = 'Please enter an email address';
                }
                else if( !$scope.pass ) {
                    $scope.err = 'Please enter a password';
                }
                else if( $scope.pass !== $scope.confirm ) {
                    $scope.err = 'Passwords do not match';
                }
                return !$scope.err;
            }

            $scope.err = null;
            if( assertValidLoginAttempt() ) {
                simpleLogin.createAccount($scope.email, $scope.pass, function(err, user) {
                    if( err ) {
                        $scope.err = err? err + '' : null;
                    }
                    else {
//                        must be logged in before I can write to my profile
                        $scope.loginPassword(function() {
//                            simpleLogin.createProfile(user.id, user.email);
                            $location.path('/account');
                        });
                    }
                });
            }
        };//end Create Account

        $scope.goNext = function (hash) {
            $location.path(hash);
        };


        ////////Push to List\\\\\\\\\\\\


        $scope.addtodo = function() {
            var listRef = new Firebase('https://string.firebaseio.com/users/'+$rootScope.user.id);
            $scope.list = $firebase(listRef);
            // AngularFire $add method
            $scope.list.$add({
                body : $scope.newtodo,
            });

            $scope.newtodo = '';
        };//end push to List




    });
