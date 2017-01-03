(function() {
  'use strict';

  angular
    .module('angularRails')
    .controller('NewGameController', function($scope, GameService, $auth) {
      console.log($auth.user)
      $scope.game = {}
      $scope.home_name = $auth.user.name.split(' ')[0]
      $scope.new_game = function () {
        if ($scope.proof_file != null) {
          $scope.game.proof_file = $scope.proof_file
        }
        console.log($scope.proof_file)
        GameService.createGame($scope.game)
         .then(function (result) {
          console.log(result);
         })
         .catch (function (err) {
          console.log(err);
         })
      }

    });
})();
