(function() {
  'use strict';

  angular
    .module('angularRails')
    .directive('disableOnPromise', function ($parse) {
      return {
        restrict: 'A',
        compile: function($element, attr) {
          var fn = $parse(attr.disableOnPromise);
          return function clickHandler(scope, element, attrs) {
            console.log('element : ', element)
            element.on('click', function(event) {
              attrs.$set('disabled', true);
              console.log('scope ', scope)
              console.log('event ', event)
              scope.$apply(function() {
                fn(scope, {$event:event})
               });
            });
          };
        }
      };
    });

})();
