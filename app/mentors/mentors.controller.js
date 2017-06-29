(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('jobApp')
        .controller('MentorsController', MentorsController);

    function MentorsController($scope, $http, $location, $stateParams, $state) {
        console.log('This is the MentorsController...');
        const vm = this;

        vm.$onInit = function() {
            vm.data = {};
            vm.data.name = '';
            vm.data.email = '';
            vm.tempFriendData = {};


            if ($stateParams.user_id == null) {
                $location.url('/login');
            } else {
                vm.user_id = $stateParams.user_id;
                vm.getMentors();
            }
            //   vm.mentors = [{
            //     "id": 1,
            //     "name": "Paul Kowalkski",
            //     "email": "paul@gmail.com"
            //   }
            // ];
        };


        if ($stateParams.user_id == null) {
            $location.url('/login');
        } else {
            vm.resetForm = function() {
                if (!$scope.addFriendForm.$pristine) {
                    vm.data.name = "";
                    vm.data.email = "";
                }
                vm.data.name = '';
                vm.data.email = '';
                $scope.addFriendForm.$setPristine(); //reset Form

                // vm.mentor_edit[id].email = '';
                // $scope.updateFriendForm.$setPristine();
                // if (!$scope.updateFriendForm.$pristine) {
                //   vm.data.name = "";
                //   vm.data.email = "";
                // }
                // $scope.updateFriendForm.$setPristine();
            }


            vm.resetForm2 = function() {
                if (!$scope.updateFriendForm.$pristine) {
                    vm.data.name = "";
                    vm.data.email = "";
                }
                $scope.updateFriendForm.$setPristine();
            }

            vm.mentorEdit = [];
            vm.editFriendInfo = function(id) {
                if (vm.mentorEdit[id] == false || !vm.mentorEdit[id]) {
                    console.log("Friend Edit ID:", vm.mentorEdit[id]);
                    vm.mentorEdit[id] = true;
                    vm.mentorEditing = true;
                } else {
                    //  vm.resetForm2();
                    console.log("Friend Edit ID:", vm.mentorEdit[id]);
                    vm.mentorEdit[id] = false;
                    vm.mentorEditing = false;
                    vm.setCheckedGroups(vm.allGroups);
                }
            }

            vm.editMentor = function() {
                if (vm.mentorEditDropdown == false || !vm.mentorEditDropdown) {
                    vm.mentorEditDropdown = true;
                } else {
                    vm.resetForm();
                    vm.mentorEditDropdown = false;
                }
            }

            vm.getMentors = function() {
                $http.get(`${API_URL}/user/${$stateParams.user_id}/mentors`)
                    .then(function(response) {
                        // response.data[0]; // all mentors
                        // response.data[1]; // all companies

                        // sort the companies
                        vm.allGroups = response.data[0];
                        vm.companies = response.data[1];
                        vm.companies.sort(function(s1, s2) {
                            var l = s1.name.toLowerCase(),
                                m = s2.name.toLowerCase();
                            return l === m ? 0 : l > m ? 1 : -1;
                        });
                        vm.setCheckedGroups(vm.allGroups);

                        //   // this creates an array of all the user's mentors
                        //   // with an array  of all the users mentors
                        //   // making them all initially unchecked in that company array
                        //   vm.mentors = [];
                        //   for(let x=0; x<response.data[0].length; x++){ // mentors
                        //     vm.mentors[x] = {};
                        //     vm.mentors[x]['name'] = response.data[0][x].name;
                        //     vm.mentors[x]['email'] = response.data[0][x].email;
                        //     vm.mentors[x]['id'] = response.data[0][x].id;
                        //     vm.mentors[x]['user_id'] = response.data[0][x].user_id;
                        //     vm.mentors[x].companies = [];
                        //     for(let v=0; v<vm.companies.length; v++){ // all mentors
                        //       vm.mentors[x].companies[v] = {};
                        //       vm.mentors[x].companies[v].id = vm.companies[v].id;
                        //       vm.mentors[x].companies[v].name = vm.companies[v].name;
                        //       vm.mentors[x].companies[v].user_id = vm.companies[v].user_id;
                        //       vm.mentors[x].companies[v].email = vm.companies[v].email;
                        //       vm.mentors[x].companies[v].checked = false;
                        //    }
                        //   }
                        //
                        //   for(let x=0; x<response.data[0].length; x++){ // mentors
                        //   // response.data[0][x].id
                        //     for(let v=0; v<response.data[0][x].company.length; v++){ // all companies
                        //     // response.data[0][x].mentor[v].id
                        //       for(let y=0; y<vm.mentors.length; y++){ // companies
                        //         if (vm.mentors[y].id == response.data[0][x].id) {
                        //           for(let z=0; z<vm.mentors[y].companies.length; z++){ // mentors
                        //             if (vm.mentors[y].companies[z].id == response.data[0][x].company[v].id) {
                        //                 vm.mentors[y].companies[z].checked = true;
                        //             }
                        //          }
                        //         }
                        //       }
                        //     }
                        //   }
                        //  // sort mentors in order
                        //   vm.mentors.sort(function(s1, s2) {
                        //       var l = s1.name.toLowerCase(),
                        //           m = s2.name.toLowerCase();
                        //       return l === m ? 0 : l > m ? 1 : -1;
                        //   });
                    });
            }

            vm.setCheckedGroups = function(allGroups) {
                // this creates an array of all the user's mentors
                // with an array  of all the users mentors
                // making them all initially unchecked in that company array
                vm.mentors = [];
                for (let x = 0; x < allGroups.length; x++) { // mentors
                    vm.mentors[x] = {};
                    vm.mentors[x]['name'] = allGroups[x].name;
                    // vm.mentors[x]['email'] = allGroups[x].email;
                    vm.mentors[x]['id'] = allGroups[x].id;
                    vm.mentors[x]['user_id'] = allGroups[x].user_id;
                    vm.mentors[x].companies = [];
                    for (let v = 0; v < vm.companies.length; v++) { // all mentors
                        vm.mentors[x].companies[v] = {};
                        vm.mentors[x].companies[v].id = vm.companies[v].id;
                        vm.mentors[x].companies[v].name = vm.companies[v].name;
                        vm.mentors[x].companies[v].user_id = vm.companies[v].user_id;
                        vm.mentors[x].companies[v].email = vm.companies[v].email;
                        vm.mentors[x].companies[v].checked = false;
                    }
                }

                for (let x = 0; x < allGroups.length; x++) { // mentors
                    for (let v = 0; v < allGroups[x].company.length; v++) { // all companies
                        for (let y = 0; y < vm.mentors.length; y++) { // companies
                            if (vm.mentors[y].id == allGroups[x].id) {
                                for (let z = 0; z < vm.mentors[y].companies.length; z++) { // mentors
                                    if (vm.mentors[y].companies[z].id == allGroups[x].company[v].id) {
                                        vm.mentors[y].companies[z].checked = true;
                                    }
                                }
                            }
                        }
                    }
                }
                // sort mentors in order
                vm.mentors.sort(function(s1, s2) {
                    var l = s1.name.toLowerCase(),
                        m = s2.name.toLowerCase();
                    return l === m ? 0 : l > m ? 1 : -1;
                });
            }

            vm.companyChecked = function(mentor_id, company_id) {
                console.log("FRIEND-GroupChecked: " + mentor_id + "," + company_id);
                for (let x = 0; x < vm.mentors.length; x++) {
                    if (vm.mentors[x].id == mentor_id) {
                        for (let y = 0; y < vm.mentors[x].companies.length; y++) {
                            if (vm.mentors[x].companies[y].id == company_id) {
                                if (vm.mentors[x].companies[y].checked == false) {
                                    vm.mentors[x].companies[y].checked = true;
                                    console.log("CHECKED !!!");
                                } else {
                                    vm.mentors[x].companies[y].checked = false;
                                    console.log("UNCHECKED !!!");
                                }
                            }
                        }
                    }
                }
                console.log("Groups: => ", vm.mentors);
            }

            // vm.companyChecked = function (mentor_id, company_id){
            //   console.log("GROUP-FriendCHecked: "+company_id+","+mentor_id);
            //   for(let x=0; x<vm.mentors.length; x++) {
            //     if (vm.companies[x].id == company_id) {
            //       for(let y=0; y<vm.mentors[x].companies.length; y++){
            //         if (vm.mentors[x].companies[y].id == mentor_id){
            //           if (vm.mentors[x].companies[y].checked == false) {
            //             vm.mentors[x].companies[y].checked = true;
            //             console.log("CHECKED !!!");
            //           } else {
            //             vm.mentors[x].companies[y].checked = false;
            //             console.log("UNCHECKED !!!");
            //           }
            //         }
            //       }
            //     }
            //   }
            //   console.log("Groups: => ",vm.mentors);
            // }

            vm.addFriend = function() {
                console.log("Add Friend");
                vm.data.user_id = $stateParams.user_id;
                console.log(vm.data);
                $http.post(`${API_URL}/user/${$stateParams.user_id}/mentors`, vm.data)
                    .then(function(data) {
                        console.log(data);
                        vm.getMentors();
                        vm.mentorEditDropdown = false;
                        vm.resetForm();
                    }, function() {
                        console.log('Add Friend Failed!');
                    });
                console.log("Added Friend");
            }


            vm.deleteFriend = function(id) {
                $http.delete(`${API_URL}/user/${$stateParams.user_id}/mentors/${id}`)
                    .then(function(data) {
                        console.log(data);
                        vm.getMentors();
                        vm.resetForm();
                        vm.mentorEditing = false;
                        vm.mentorEditDropdown = false;
                    }, function() {
                        console.log('Delete Friend Failed!');
                    });
                console.log("Deleted Friend");
            }


            vm.updateFriend = function(mentor_id) {
                console.log("Friend Update Index: ", mentor_id);

                for (let x = 0; x < vm.mentors.length; x++) {
                    if (vm.mentors[x].id == mentor_id) {
                        vm.tempFriendData = vm.mentors[x];
                    }
                }

                console.log("THIS IS THE mentorTemp !!!!", vm.mentorTemp);
                console.log("THIS IS THE tempFriendData !!!!", vm.tempFriendData);

                vm.mentorEdit[mentor_id] = false;
                vm.mentorEditDropdown = false;
                vm.mentorEditing = false;
                // vm.mentor_edit[mentor_id].mentor_id = mentor_id;
                // console.log(vm.mentor_edit[id]);
                // $http.patch(`${API_URL}/user/${$stateParams.user_id}/mentors/${id}`, vm.mentor_edit[id])
                $http.post(`${API_URL}/user/${$stateParams.user_id}/mentors/${mentor_id}`, vm.tempFriendData)
                    .then(function(data) {
                        console.log(data);
                        vm.freindEdit[mentor_id] = false;
                        vm.mentorEditDropdown = false;
                        vm.resetForm();
                        vm.getMentors();
                        console.log("Updated Friend");

                        // vm.getMentors();
                        // vm.resetForm(id);
                        // vm.mentorEditDropdown = false;
                    }, function() {
                        console.log('Update Friend Failed!');
                    });
            }
        }
    }

    function getHostUrl() {
        if (window.location.host.indexOf('localhost') != -1) {
            return 'http://localhost:3000';
        } else {
            return 'https://joblisto.herokuapp.com';
        }
    }

})();
