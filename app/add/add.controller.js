(function(){
  'use strict';

  const API_URL = getHostUrl();

  angular
    .module('sumApp')
    .controller('AddController', AddController);

    function AddController($scope, $http, $location, $stateParams, $state) {
      console.log('This is the AddController...');
      const vm = this;

      vm.$onInit = function() {
        if ($stateParams.user_id == null){
          $location.url('/login');
        } else {
          vm.user_id = $stateParams.user_id;
        }
        // vm.data = [];
        //
        // vm.data.image_url = 'http://images.evo.com/imgp/700/105373/472194/intense-cycles-tracer-275a-foundation-complete-mountain-bike-2016-red.jpg';
        // vm.groups = [{
        //         "id": 1,
        //         "name": "Family",
        //         "checked": true
        //     }
        // ];
        // vm.data.push(vm.groups);
        // console.log(vm.data);

      }

      if ($stateParams.user_id == null){
        $location.url('/login');
      } else {
        vm.newItem = function() {
            vm.data.user_id = $stateParams.user_id;
            console.log(vm.data);
            $http.post(`${API_URL}/user/${$stateParams.user_id}/items`, vm.data)
            .then(function(data) {
              console.log(data);

              $state.go(`items`, {
                  user_id: $stateParams.user_id
              });
              // $location.url(`/profile/${$stateParams.user_id}/items`);
            }, function() {
              console.log('NewItem Failed!');
            });
          }
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
