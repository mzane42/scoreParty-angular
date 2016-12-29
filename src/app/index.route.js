(function() {
  'use strict';

  angular
    .module('angularRails')
    .config(routerConfig)
    .factory('Game', ['railsResourceFactory', function(railsResourceFactory) {
      return railsResourceFactory({
        url: 'http://localhost:3001/api/v1/games',
        name: 'game'
      });
    }]);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('games', {
        url: '/games',
        templateUrl: 'app/games/games.html',
        controller: 'GamesController',
        controllerAs: 'games'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
