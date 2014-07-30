'use strict';

/**
 * @ngdoc function
 * @name loopbackApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loopbackApp
 */
angular.module('loopbackApp')
  .controller('LoginCtrl', function ($scope, $routeParams, User, $location, AppAuth) {
    $scope.credentials = {
      email: 'foo@bar.com',
      password: '123456'
    };

    $scope.login = function() {
      $scope.loginResult = User.login({
          include: 'user',
          rememberMe: true
        }, $scope.credentials,
        function() {
          var next = $location.nextAfterLogin || '/';
          $location.nextAfterLogin = null;
          AppAuth.currentUser = $scope.loginResult.user;
          $location.path(next);
        },
        function(res) {
          $scope.loginError = res.data.error;
        }
      );
    };
  });
