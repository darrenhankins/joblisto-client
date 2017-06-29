(function(){
  'use strict';

  angular
    .module('jobApp')
    .controller('ProfileController', ProfileController);

    function ProfileController($scope, $http){
      console.log("This is the ProfileController...");
    }

})();
