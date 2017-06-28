(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('sumApp')
        .controller('ClaimController', ClaimController);

    function ClaimController($scope, $http, $stateParams) {
        console.log("This is the ClaimController...");
        const vm = this;
        vm.item_id = $stateParams.item_id;


        // '/claim/item/:item_id/friend/:friend_id/uuid/:uuid'
        console.log($stateParams.item_id);
        vm.data = [];
        vm.data.push($stateParams.item_id);

        vm.$onInit = function() {

        }

        vm.claimItem = function() {
            // $http.put('http://localhost:3000/user/claim/items/1')
            //   .then(function (response) {
            //     vm.items = response.data;
            //     console.log(response.data);
            //   });
            vm.claimedItem = true;

            $http.patch(`${API_URL}/user/claim/items/${vm.item_id}`, vm.data)
                .then(function(data) {
                    console.log(data);
                    console.log("Claimed!!!");
                    // $location.url('/profile/items');
                }, function() {
                    console.log('Update Item Failed!');
                });
        }

        vm.claimItemNo = function(){
          vm.claimedItemNo = true;


        }

    }

    function getHostUrl() {
        if (window.location.host.indexOf('localhost') != -1) {
            return 'http://localhost:3000';
        } else {
            return 'https://sum-app.herokuapp.com';
        }
    }

})();
