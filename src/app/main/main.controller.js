(function() {
  'use strict';

  angular
    .module('angularRails')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $scope, $state, $stateParams, $auth) {
    var vm = this;

    $rootScope.$on('auth:login-success', function(ev, user) {
      console.log('Success : ', user)
    });

    $rootScope.$on('auth:login-error', function (err) {
      console.log('Something went wrong')
      console.log(err);
    })
    // when the user logs out, remove the games
    /*
      $rootScope.$on('auth:logout-success', function(ev) {
        console.log('good!')
      });
    */
  }
})();
