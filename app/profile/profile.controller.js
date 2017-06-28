(function(){
  'use strict';

  angular
    .module('sumApp')
    .controller('ProfileController', ProfileController);

    function ProfileController($scope, $http){
      console.log("This is the ProfileController...");
    }

})();
