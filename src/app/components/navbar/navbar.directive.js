(function() {
  'use strict';

  angular
    .module('angularRails')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $scope, $auth, $location) {
      var vm = this;

      $auth.validateUser()
        .then(function(result){
          $scope.user = result
        })
        .catch (function (err) {
          console.log(err);
        })
      $scope.handleSignOutBtnClick = function() {
        $auth.signOut()
          .then(function(resp) {
            $location.path('/')
            // handle success response
          })
          .catch(function(resp) {
            // handle error response
          });
      };

    }
  }

})();
