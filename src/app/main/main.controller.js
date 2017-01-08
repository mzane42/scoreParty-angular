(function() {
  'use strict';

  angular
    .module('angularRails')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $scope, $state, $stateParams, $auth, $location, SweetAlert, $timeout) {
    var vm = this;

    $scope.handleFbBtnClick = function() {
      $auth.authenticate('facebook')
        .then(function(user) {
          $state.go('games');
          // handle success
        })
        .catch(function(error) {
          SweetAlert.swal("Something went wrong", error, "error");
          $location.path('/')
          // handle errors
        });
    };
    // when the user logs out, remove the games

  }
})();
