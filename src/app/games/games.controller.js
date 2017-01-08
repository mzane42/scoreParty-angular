(function() {
  'use strict';

  angular
    .module('angularRails')
    .controller('GamesController', function($scope, GameService, SweetAlert) {
      $scope.isCollapsed = true;
      $scope.descriptionIsCollapsed = true;
      $scope.typeGameSelected = {}
      $scope.triSelect = {}
      $scope.triSelect = [
        {id: 1, name: 'Du plus recent', value: '-created_at', group: 'created_at | date:"MM/dd/yyyy"'},
        {id: 2, name: 'Du plus ancien',  value: 'created_at',  group: 'created_at | date:"MM/dd/yyyy"'},
        {id: 3, name: 'De la plus grosse victoire',  value: '-diff_score'},
        {id: 4, name: 'De la plus grosse defaite',  value: 'diff_score'}
      ];
      $scope.triSelect.selected = { value: $scope.triSelect[0] };
      $scope.dateFilter = 'created_at | date:"MM/dd/yyyy"'
      GameService.getGamesType()
        .then(function (games_type) {
          $scope.games_type = games_type
          $scope.games_type.unshift({id: 0, name: 'Tout'})
          console.log($scope.games_type[5])
          $scope.typeGameSelected.selected = {value: $scope.games_type[0]}
        })
        .catch(function (err) {
          console.log(err)
        })

      var game_query = function(){
        GameService.GetAll()
          .then(function(games){
            $scope.games = games;
            console.log($scope.games)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
      // when the user logs in, fetch the games
      $scope.removeGame = function (game_id, index) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false},
          function(){
            GameService.deleteById(game_id)
              .then(function (deleted) {
                console.log(index)
                $scope.games.splice(index, 1);
                SweetAlert.swal("Booyah!", deleted, 'success');
              })
              .catch(function (err) {
                SweetAlert.swal('Oops', err, 'error');
              })
          });
      }

      // will get a "401 Unauthorized" if the user is not authenticated
      game_query();

    });

})();
