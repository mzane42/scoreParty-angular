(function() {
  'use strict';

  angular
    .module('angularRails')
    .controller('NewGameController', function($scope, GameService, $auth, $state) {
      $scope.typeGameSelect = {}
      $scope.file_name = ''
      $scope.fileNameChanged = function(element) {
        $scope.file_name = element.files[0].name
          // Turn the FileList object into an Array
      }
      GameService.getGamesType()
        .then(function (games_type) {
          $scope.games_type = games_type
          $scope.typeGameSelect.selected = {value: $scope.games_type[0]}
        })
        .catch(function (err) {
          console.log(err)
        })
      $scope.game = {}
      $scope.home_name = $auth.user.name.split(' ')[0]

      $scope.new_game = function () {
        if ($scope.proof_file != null) {
          $scope.game.proof_file = $scope.proof_file
        }
        $scope.game.game_type_id = $scope.typeGameSelect.selected.value.id
        GameService.createGame($scope.game)
         .then(function (result) {
           $state.go('games');
         })
         .catch (function (err) {
          console.log(err);
         })
      }

    });
})();
