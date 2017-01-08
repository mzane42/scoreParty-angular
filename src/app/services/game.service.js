(function () {
  'use strict';

  angular
    .module('angularRails')
    .factory('GameService', Service)

  function Service($http, $q) {
    var service = {};
    var baseUrl = 'http://localhost:3001/api/v1'

    service.GetAll = GetAll;
    service.createGame = createGame;
    service.deleteById = deleteById;
    service.getGamesType = getGamesType;
    service.FriendsGameAll = FriendsGameAll
    return service;


    function GetAll() {
      return $http.get(baseUrl + '/games').then(handleSuccess, handleError);
    }

    function FriendsGameAll() {
      return $http.get(baseUrl + '/games_friend').then(handleSuccess, handleError);
    }

    function createGame(game) {
      return $http.post(baseUrl + '/games', {game: game }).then(handleSuccess, handleError);
    }
    // private functions
    function deleteById(game_id) {
      return $http.delete(baseUrl + '/games/'+ game_id).then(handleSuccess, handleError);
    }

    function getGamesType() {
      return $http.get(baseUrl + '/game_types').then(handleSuccess, handleError)
    }

    function handleSuccess(res) {
      return $q.resolve(res.data);
    }

    function handleError(err) {
      return $q.reject(err);
    }
  }
})();
