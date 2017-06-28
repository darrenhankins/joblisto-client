(function() {
    'use strict';

    angular
        .module('sumApp')
        .controller('SendemailController', SendemailController);

    function SendemailController($scope, $http) {
        console.log("This is the SendemailController...");
        const vm = this;

        // $scope.complete = function(content) {
        //   console.log(content); // process content
        // }

        vm.$onInit = function() {

          // get all item
          // $http.get('http://localhost:3000/user/1/items')
          // .then(function (response) {
          //   vm.items = response.data;
          //   console.log(response.data);
          // });


        }

        // https://sum-app.herokuapp.com/user/1/items
    }

})();
