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
    return service;


    function GetAll() {
      return $http.get(baseUrl + '/games').then(handleSuccess, handleError);
    }

    function createGame(game) {
      return $http.post(baseUrl + '/games', {game: game }).then(handleSuccess, handleError);
    }
    // private functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(res) {
      return $q.reject(res);
    }
  }
})();
