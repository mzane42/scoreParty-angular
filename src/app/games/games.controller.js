(function() {
  'use strict';

  angular
    .module('angularRails')
    .controller('GamesController', function($scope, GameService) {

      // method to query the games api and store the results in $scope
      // note: the linter will complain, but that can be fixed later:
      // You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"
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


      // will get a "401 Unauthorized" if the user is not authenticated
      game_query();

    });

})();
