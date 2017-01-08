(function() {
  'use strict';

  angular
    .module('angularRails')
    .filter('timeAgo', function () {
      return function (date) {
        var delta = Math.round((+new Date - new Date(date)) / 1000);

        var minute = 60,
          hour = minute * 60,
          day = hour * 24,
          week = day * 7;

        var fuzzy;

        if (delta < 30) {
          fuzzy = 'maintenant';
        } else if (delta < minute) {
          fuzzy = "il y'a quelques secondes.";
        } else if (delta < 2 * minute) {
          fuzzy = 'il y a une minute.'
        } else if (delta < hour) {
          fuzzy = "il y'a " + Math.floor(delta / minute) + ' minutes ';
        } else if (Math.floor(delta / hour) == 1) {
          fuzzy = 'il y a une heure.'
        } else if (delta < day) {
          fuzzy = "il y'a "+ Math.floor(delta / hour) + ' heures';
        } else if (delta < day * 2) {
          fuzzy = 'Hier';
        }
        return fuzzy
      }
    })
    .filter('verifiedImg', function () {
      return function (verified) {
        if (verified != null && verified == true){
          return '../../assets/images/checked-s.png'
        }else {
          return '../../assets/images/unchecked-s.png'
        }
      }
    })
    .filter('verified', function () {
      return function (verified) {
        if (verified != null && verified == true){
          return 'avec preuve'
        }else {
          return 'sans preuve'
        }
      }
    })
    .filter('verifiedClass', function () {
      return function (verified) {
        if (verified != null && verified == true) {
          return 'verified'
        }else {
          return 'not-verified'
        }
      }
    })
    .filter("typeGameSelect", function () {
      return function (items, type) {
        var arrayToReturn = [];
        if (items && type != 'Tout'){
          for (var i=0; i< items.length; i++){
            if (items[i].game_type.name == type)  {
              arrayToReturn.push(items[i]);
            }
          }
          return arrayToReturn;
        }else {
          return items
        }
      }
    })

})();
