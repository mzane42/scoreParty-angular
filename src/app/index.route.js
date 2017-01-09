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
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          auth: function ($auth, $state) {
            return $auth.validateUser()
              .then(function(result){
                  if (result) {
                    $state.go('games');
                  }
              })
              .catch (function (err) {
                  console.log(err);
              })
          }
        }
      })
      .state('new_game', {
        url: '/new',
        templateUrl: 'app/new_game/new_game.html',
        controller: 'NewGameController',
        css: 'app/new_game/new_game.css',
        controllerAs: 'newGame',
        resolve: {
          auth: function ($auth, $state) {
            return $auth.validateUser().catch(function(err){
              console.info('not authenticated', err);
              $state.go('home');
            })
          }
        }
      })
      .state('games', {
        url: '/games',
        templateUrl: 'app/games/games.html',
        controller: 'GamesController',
        controllerAs: 'games',
        resolve: {
          auth: function ($auth, $state) {
            return $auth.validateUser().catch(function(err){
              console.info('not authenticated', err);
              $state.go('home');
            })
          }
        }
      })
    .state('friends_games', {
      url: '/friends_games',
      templateUrl: 'app/friends_games/friends_games.html',
      controller: 'FriendsGamesController',
      controllerAs: 'friendsGames',
      resolve: {
        auth: function ($auth, $state) {
          return $auth.validateUser().catch(function(err){
            console.info('not authenticated', err);
            $state.go('home');
          })
        }
      }
    })

/*
    $locationProvider.html5Mode(true);
*/

    $urlRouterProvider.otherwise('/');
  }

})();
