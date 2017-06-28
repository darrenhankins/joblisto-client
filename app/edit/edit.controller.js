(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('sumApp')
        .controller('EditController', EditController);

    function EditController($scope, $http, $location, $stateParams, $state) {
        console.log("This is the EditController...");
        const vm = this;

        vm.$onInit = function() {
            if ($stateParams.user_id == null) {
                $location.url('/login');
            } else {
              vm.user_id = $stateParams.user_id;
              vm.item_id = $stateParams.item_id;
            }
            // vm.groups = [{
            //         "id": 1,
            //         "name": "Family",
            //         "checked": true
            //     }
            // ];
            // vm.items = [{
            //         "id": 1,
            //         "user_id": 1,
            //         "name": "Rockies Tickets",
            //         "description": "2 Tickets to Opening Day",
            //         "image_url": "http://hlsb.com/Images/Rockies/tickets.png",
            //         "free": false,
            //         "available": true,
            //         "emailed": false,
            //         "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
            //     }
            // ];
        }

        if ($stateParams.user_id == null) {
            $location.url('/login');
        } else {
            // get item
            $http.get(`${API_URL}/user/${$stateParams.user_id}/items/${$stateParams.item_id}`)
              .then(function(response) {
                  vm.item = response.data[0];
                  vm.groups = response.data[0].group;
                  vm.allGroups =response.data[1];
                  console.log("ITEM: ", vm.item);
                  console.log("GROUPS:", vm.groups);
                  console.log("ALL GROUPS:", vm.allGroups);
                  vm.setCheckedGroups();
              });

              vm.setCheckedGroups = function() {
                  // this creates an array of all groups associated with an item
                  // making them all initially unchecked in that group array
                  vm.checkedGroups = [];
                  for (let v = 0; v < vm.allGroups.length; v++) { // all groups
                      vm.checkedGroups[v] = {};
                      vm.checkedGroups[v].id = vm.allGroups[v].id;
                      vm.checkedGroups[v].name = vm.allGroups[v].name;
                      vm.checkedGroups[v].user_id = vm.allGroups[v].user_id;
                      vm.checkedGroups[v].checked = false;
                  }
                  // this checks the groups that are associated with the item
                  for (let x = 0; x < vm.checkedGroups.length; x++) { // all groups
                      // for (let v = 0; v < allGroups[x].group.length; v++) { // all groups
                          for (let y = 0; y < vm.groups.length; y++) { // groups associated with item
                              if (vm.groups[y].id == vm.checkedGroups[x].id) { // if groups exists check the box
                                  // for (let z = 0; z < vm.friends[y].groups.length; z++) { // friends
                                      // if (vm.friends[y].groups[z].id == allGroups[x].group[v].id) {
                                          vm.checkedGroups[x].checked = true;
                                      // }
                                  // }
                              }
                          }
                      // }
                  }
                  // sort checkedGroups array in order
                  vm.checkedGroups.sort(function(s1, s2) {
                      var l = s1.name.toLowerCase(),
                          m = s2.name.toLowerCase();
                      return l === m ? 0 : l > m ? 1 : -1;
                  });
                  console.log("CHECKED GROUPS:", vm.checkedGroups);

              }

              vm.groupChecked = function(group_id) {
                  console.log("ITEM-GroupChecked: " + group_id);
                  for (let x = 0; x < vm.checkedGroups.length; x++) {
                      if (vm.checkedGroups[x].id == group_id) {
                          // for (let y = 0; y < vm.friends[x].groups.length; y++) {
                              // if (vm.friends[x].groups[y].id == group_id) {
                                  if (vm.checkedGroups[x].checked == false) {
                                      vm.checkedGroups[x].checked = true;
                                      console.log("CHECKED !!!");
                                  } else {
                                      vm.checkedGroups[x].checked = false;
                                      console.log("UNCHECKED !!!");
                                  }
                              // }
                          // }
                      }
                  }
                  console.log("Checked Groups: => ", vm.checkedGroups);
              }

            vm.updateItem = function(item_id) {
              console.log("Update Item:", item_id);
              let data = [];
              data.push(vm.item);
              data.push(vm.checkedGroups);
              console.log("DATA", data);
              $http.post(`${API_URL}/user/${$stateParams.user_id}/items/${item_id}`, data)
              // $http.patch(`${API_URL}/user/${$stateParams.user_id}/items/${item_id}`, data)
                .then(function(response) {
                  console.log(data);
                  $state.go(`items`, {
                    user_id: $stateParams.user_id
                  });
                }, function() {
                  console.log('UpdatedItem');
                });
            }

            vm.deleteItem = function(id) {
              $http.delete(`${API_URL}/user/${$stateParams.user_id}/items/${id}`)
                  .then(function(data) {
                      console.log(data);
                      $state.go(`items`, {
                        user_id: $stateParams.user_id
                      });
                  }, function() {
                      console.log('Delete Group Failed!');
                  });
              console.log("Deleted Item:", id);
            }

            vm.cancelEdit = function() {
              $state.go(`items`, {
                user_id: vm.user_id
              });
            }

            // vm.itemEdit = [];
            // vm.editItemInfo = function(id) {
            //     if (vm.itemEdit[id] == false || !vm.itemEdit[id]) {
            //         console.log(vm.itemEdit[id]);
            //         vm.itemEdit[id] = true;
            //     } else {
            //         console.log(vm.itemEdit[id]);
            //         vm.itemEdit[id] = false;
            //     }
            // }
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
