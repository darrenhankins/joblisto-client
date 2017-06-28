(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('jobApp')
        .controller('CompaniesController', GroupsController);

    function GroupsController($scope, $http, $stateParams, $state, $location) {
        console.log("This is the CompaniesController...");
        const vm = this;

        vm.$onInit = function() {
            vm.data = {};
            vm.data.name = '';
            vm.tempGroupData = {};

            if ($stateParams.user_id == null) {
                $location.url('/login');
            } else {
                vm.user_id = $stateParams.user_id;
                vm.getCompanies();
            }
            // vm.groups = [{
            //         "id": 1,
            //         "name": "Family",
            //         "friends": [{
            //             "id": 1,
            //             "name": "Jim",
            //             "checked": true
            //         }]
            //     }
            // }];
        };

        if ($stateParams.user_id == null) {
            $location.url('/login');
        } else {

            vm.resetForm = function() {
                console.log("Reset Form");
                vm.data.name = '';
                $scope.addGroupForm.$setPristine();
            }

            vm.check = function(id) {
                // let id1 = id-1;
                console.log("FRIEND ID:" + id);
                // vm.groups[0].friends[id-1].checked = true;
                // vm.toDatabase.push(id);
                // console.log("CHECK");
                // console.log(vm.groups[0].friends[id-1]);
            }

            vm.unCheck = function(id) {
                // for (let i=0; i<vm.toDatabase.length; i++) {
                //   if (id == vm.toDatabase[i]) {
                //     vm.toDatabase.splice(i, 1);
                //   }
                // }
                // let id1 = id-1;
                console.log("Checkbox ID:", id - 1);
                // vm.groups[0].friends[id-1].checked = false;
                // console.log("Checked:", vm.groups[0].friends[id-1].checked);
            }

            //  vm.groupEdit = [];
            //  vm.editGroupInfo = function (id) {
            //    console.log("Group Edit ID:", id);
            //    if (vm.groupEdit[id] == false || !vm.groupEdit[id]){
            //      vm.displayGroupInfo(id);
            //      vm.groupEdit[id] = true;
            //    } else {
            //      console.log(vm.groupEdit[id]);
            //      vm.groupEdit[id]= false;
            //    }
            //  }

            vm.groupEdit = [];
            vm.editGroupInfo = function(id) {
                if (vm.groupEdit[id] == false || !vm.groupEdit[id]) {
                    console.log("Group Edit ID:", id);
                    vm.groupEdit[id] = true;
                    vm.groupEditing = true;
                } else {
                    //  vm.resetForm2();
                    console.log("Group Edit ID:", id);
                    vm.groupEdit[id] = false;
                    vm.groupEditing = false;
                    vm.setCheckedFriends(vm.allGroups);
                }
            }

            vm.editGroup = function() {
                if (vm.groupEditDropdown == false || !vm.groupEditDropdown) {
                    vm.groupEditDropdown = true;
                } else {
                    vm.resetForm();
                    vm.groupEditDropdown = false;
                }
            }


            vm.displayGroupInfo = function(id) {
                vm.groupId = id;
                console.log("Group ID:", vm.groupId);
                var currentGroup = [];
                // currentFriendsInGroup
                // allFriendsOfUser
                // console.log("Total Friends of Users:", vm.allGroups.length);
                // console.log("Total Groups:", vm.currentFriendsInGroup.length);
                // console.log(vm.currentFriendsInGroup);
                // console.log("ID", vm.currentFriendsInGroup[0].id);
                // for (var i=0; i<vm.allFriendsOfUser.length; i++){
                //   if (vm.currentFriendsInGroup[i].id == vm.allFriendsOfUser[i].id) {
                //     console.log(vm.allFriendsOfUser[i].id, vm.currentFriendsInGroup[i].id);
                //   }
                // console.log("Name", vm.currentFriendsInGroup[i].name);
                // console.log("Email", vm.currentFriendsInGroup[i].email);
                // }
            }

            vm.getGroups = function() {
                $http.get(`${API_URL}/user/${$stateParams.user_id}/groups`)
                    .then(function(response) {
                        // response.data[0]; // all groups
                        // response.data[1]; // all friends

                        // sort function for groups
                        vm.allGroups = response.data[0];
                        vm.friends = response.data[1];
                        vm.friends.sort(function(s1, s2) {
                            var l = s1.name.toLowerCase(),
                                m = s2.name.toLowerCase();
                            return l === m ? 0 : l > m ? 1 : -1;
                        });

                        vm.setCheckedFriends(vm.allGroups);

                        // this creates an array of all the user's groups
                        // with an array of all the users friends
                        // making them all initially unchecked in that group array
                        //    vm.groups = [];
                        //   //  for(let x=0; x<response.data[0].length; x++){ // groups
                        //   //    vm.groups[x] = {};
                        //   //    vm.groups[x]['name'] = response.data[0][x].name;
                        //   //    vm.groups[x]['email'] = response.data[0][x].email;
                        //   //    vm.groups[x]['id'] = response.data[0][x].id;
                        //   //    vm.groups[x]['user_id'] = response.data[0][x].user_id;
                        //   //    vm.groups[x].friends = [];
                        //   //    for(let v=0; v<vm.friends.length; v++){ // all friends
                        //   //      vm.groups[x].friends[v] = {};
                        //   //      vm.groups[x].friends[v].id = vm.friends[v].id;
                        //   //      vm.groups[x].friends[v].name = vm.friends[v].name;
                        //   //      vm.groups[x].friends[v].user_id = vm.friends[v].user_id;
                        //   //      vm.groups[x].friends[v].email = vm.friends[v].email;
                        //   //      vm.groups[x].friends[v].checked = false;
                        //   //   }
                        //   // }
                        //   for(let x=0; x<vm.allGroups.length; x++){ // groups
                        //     vm.groups[x] = {};
                        //     vm.groups[x]['name'] = vm.allGroups[x].name;
                        //     vm.groups[x]['email'] = vm.allGroups[x].email;
                        //     vm.groups[x]['id'] = vm.allGroups[x].id;
                        //     vm.groups[x]['user_id'] = vm.allGroups[x].user_id;
                        //     vm.groups[x].friends = [];
                        //     for(let v=0; v<vm.friends.length; v++){ // all friends
                        //       vm.groups[x].friends[v] = {};
                        //       vm.groups[x].friends[v].id = vm.friends[v].id;
                        //       vm.groups[x].friends[v].name = vm.friends[v].name;
                        //       vm.groups[x].friends[v].user_id = vm.friends[v].user_id;
                        //       vm.groups[x].friends[v].email = vm.friends[v].email;
                        //       vm.groups[x].friends[v].checked = false;
                        //    }
                        //  }
                        //
                        //   // this sets the checked value to true
                        //   // if the friend has an entry for that particular group
                        //   //  for(let x=0; x<response.data[0].length; x++){ // all groups
                        //   //  // response.data[0][x].id
                        //   //    for(let v=0; v<response.data[0][x].friend.length; v++){ // all friends
                        //   //    // response.data[0][x].friend[v].id
                        //   //      for(let y=0; y<vm.groups.length; y++){ // all groups
                        //   //      if (vm.groups[y].id == response.data[0][x].id) {
                        //   //        for(let z=0; z<vm.groups[y].friends.length; z++){ // friends
                        //   //          if (vm.groups[y].friends[z].id == response.data[0][x].friend[v].id) {
                        //   //            vm.groups[y].friends[z].checked = true;
                        //   //          }
                        //   //       }
                        //   //     }
                        //   //     }
                        //   //    }
                        //   //   }
                        //     for(let x=0; x<vm.allGroups.length; x++){ // all groups
                        //     // vm.allGroups[x].id
                        //       for(let v=0; v<vm.allGroups[x].friend.length; v++){ // all friends
                        //       // vm.allGroups[x].friend[v].id
                        //         for(let y=0; y<vm.groups.length; y++){ // all groups
                        //         if (vm.groups[y].id == vm.allGroups[x].id) {
                        //           for(let z=0; z<vm.groups[y].friends.length; z++){ // friends
                        //             if (vm.groups[y].friends[z].id == vm.allGroups[x].friend[v].id) {
                        //               vm.groups[y].friends[z].checked = true;
                        //             }
                        //          }
                        //        }
                        //        }
                        //       }
                        //      }
                        //   // sort groups in order
                        //    vm.groups.sort(function(s1, s2) {
                        //        var l = s1.name.toLowerCase(),
                        //            m = s2.name.toLowerCase();
                        //        return l === m ? 0 : l > m ? 1 : -1;
                        //    });
                    });
            }

            vm.setCheckedFriends = function(allGroups) {
                vm.groups = [];
                for (let x = 0; x < allGroups.length; x++) { // groups
                    vm.groups[x] = {};
                    vm.groups[x]['name'] = allGroups[x].name;
                    vm.groups[x]['email'] = allGroups[x].email;
                    vm.groups[x]['id'] = allGroups[x].id;
                    vm.groups[x]['user_id'] = allGroups[x].user_id;
                    vm.groups[x].friends = [];
                    for (let v = 0; v < vm.friends.length; v++) { // all friends
                        vm.groups[x].friends[v] = {};
                        vm.groups[x].friends[v].id = vm.friends[v].id;
                        vm.groups[x].friends[v].name = vm.friends[v].name;
                        vm.groups[x].friends[v].user_id = vm.friends[v].user_id;
                        vm.groups[x].friends[v].email = vm.friends[v].email;
                        vm.groups[x].friends[v].checked = false;
                    }
                }
                for (let x = 0; x < allGroups.length; x++) { // all groups
                    for (let v = 0; v < allGroups[x].friend.length; v++) { // all friends
                        for (let y = 0; y < vm.groups.length; y++) { // all groups
                            if (vm.groups[y].id == allGroups[x].id) {
                                for (let z = 0; z < vm.groups[y].friends.length; z++) { // friends
                                    if (vm.groups[y].friends[z].id == allGroups[x].friend[v].id) {
                                        vm.groups[y].friends[z].checked = true;
                                    }
                                }
                            }
                        }
                    }
                }
                // sort groups in order
                vm.groups.sort(function(s1, s2) {
                    var l = s1.name.toLowerCase(),
                        m = s2.name.toLowerCase();
                    return l === m ? 0 : l > m ? 1 : -1;
                });
            }

            vm.friendChecked = function(group_id, friend_id) {
                console.log("GROUP-FriendCHecked: " + group_id + "," + friend_id);
                for (let x = 0; x < vm.groups.length; x++) {
                    if (vm.groups[x].id == group_id) {
                        for (let y = 0; y < vm.groups[x].friends.length; y++) {
                            if (vm.groups[x].friends[y].id == friend_id) {
                                if (vm.groups[x].friends[y].checked == false) {
                                    vm.groups[x].friends[y].checked = true;
                                    console.log("CHECKED !!!");
                                } else {
                                    vm.groups[x].friends[y].checked = false;
                                    console.log("UNCHECKED !!!");
                                }
                            }
                        }
                    }
                }
                console.log("Groups: => ", vm.groups);
            }

            vm.newGroup = function() {
                vm.data.user_id = $stateParams.user_id;
                console.log("New Group:", vm.data);
                $http.post(`${API_URL}/user/${$stateParams.user_id}/groups`, vm.data)
                    .then(function(data) {
                        console.log(data);
                        vm.groupEditDropdown = false;
                        vm.resetForm();
                        vm.getGroups();
                    }, function() {
                        console.log('Group Failed!');
                    });
                console.log('Group Created');
            }

            vm.updateGroup = function(group_id) {
                console.log("Group Update Index: ", group_id);

                for (let x = 0; x < vm.groups.length; x++) {
                    if (vm.groups[x].id == group_id) {
                        vm.tempGroupData = vm.groups[x];
                    }
                }
                // name didn't change
                //  if (!vm.groupTemp) {
                //   //  vm.groupTemp.name = vm.groups[group_id].name;
                //    vm.tempGroupData.name = vm.groups[group_id].name;
                //  } else {
                //    vm.tempGroupData.name = vm.groupTemp.name;
                //  }

                console.log("THIS IS THE groupTemp !!!!", vm.groupTemp);
                console.log("THIS IS THE tempGroupData !!!!", vm.tempGroupData);
                //  var id = vm.groups[group_id].id;
                vm.groupEdit[group_id] = false;
                vm.groupEditDropdown = false;
                vm.groupEditing = false;
                //  $http.patch(`${API_URL}/user/${$stateParams.user_id}/groups/${group_id}`, vm.tempGroupData)
                $http.post(`${API_URL}/user/${$stateParams.user_id}/groups/${group_id}`, vm.tempGroupData)
                    .then(function(data) {
                        console.log(data);
                        vm.groupEdit[group_id] = false;
                        vm.groupEditDropdown = false;
                        vm.resetForm();
                        vm.getGroups();
                        console.log("Updated Group");

                    }, function() {
                        console.log('Update Group Failed!');
                    });
            }

            vm.deleteGroup = function(id) {
                $http.delete(`${API_URL}/user/${$stateParams.user_id}/groups/${id}`)
                    .then(function(data) {
                        console.log(data);
                        vm.getGroups();
                        vm.resetForm();
                        vm.groupEditing = false;
                        vm.groupEditDropdown = false;
                    }, function() {
                        console.log('Delete Group Failed!');
                    });
                console.log("Deleted Group");
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
