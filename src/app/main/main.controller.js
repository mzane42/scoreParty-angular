(function() {
  'use strict';

  angular
    .module('angularRails')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $scope, $state, $stateParams, $auth, $location) {
    var vm = this;

    $scope.handleFbBtnClick = function() {
      console.log('clicked');
      $auth.authenticate('facebook')
        .then(function(user) {
          console.log(user)
          console.log('facebook success')
          $state.go('games');
          // handle success
        })
        .catch(function(error) {
          console.lg('facebook error')
          console.log(error)
          $location.path('/')
          // handle errors
        });
    };
    // when the user logs out, remove the games

      $rootScope.$on('auth:login-success', function(ev) {
        console.log('good!')
      });

    $rootScope.$on('auth:oauth-registration', function(ev, user) {
      alert('new user registered through oauth:' + user.email);
    });

    $rootScope.$on('auth:login-success', function(ev, user) {
      alert('Welcome ', user.email);
    });
  }
})();
