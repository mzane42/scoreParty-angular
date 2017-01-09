(function() {
  'use strict';

  angular
    .module('angularRails')
    .controller('FriendsGamesController', function($scope, GameService) {
      $scope.isCollapsed = true;
      $scope.descriptionIsCollapsed = true;
      $scope.typeGameSelected = {}
      $scope.triSelect = {}
      $scope.triSelect = [
        {id: 1, name: 'Du plus recent', value: '-created_at', group: 'created_at | date:"dd/MM/yyyy"'},
        {id: 2, name: 'Du plus ancien',  value: 'created_at',  group: 'created_at | date:"dd/MM/yyyy"'},
        {id: 3, name: 'De la plus grosse victoire',  value: '-diff_score'},
        {id: 4, name: 'De la plus grosse defaite',  value: 'diff_score'}
      ];
      $scope.triSelect.selected = { value: $scope.triSelect[0] };
      $scope.dateFilter = 'created_at | date:"MM/dd/yyyy"'
      GameService.getGamesType()
        .then(function (games_type) {
          $scope.games_type = games_type
          $scope.games_type.unshift({id: 0, name: 'Tout'})
          $scope.typeGameSelected.selected = {value: $scope.games_type[0]}
        })
        .catch(function (err) {
          console.log(err)
        })

      var game_query = function(){
        GameService.FriendsGameAll()
          .then(function(games){
            $scope.games = games;
          })
          .catch(function (err) {
            console.log(err)
          })
      }
      $scope.searchQuery = function (row) {
        return (angular.lowercase(row.opposing_player).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.user.name).indexOf(angular.lowercase($scope.query) || '') !== -1);
      }
      // will get a "401 Unauthorized" if the user is not authenticated
      game_query();
    });

})();
