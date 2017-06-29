(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('jobApp')
        .controller('EditController', EditController);

    function EditController($scope, $http, $location, $stateParams, $state) {
        console.log("This is the EditController...");
        const vm = this;

        vm.$onInit = function() {
            if ($stateParams.user_id == null) {
                $location.url('/login');
            } else {
              vm.user_id = $stateParams.user_id;
              vm.job_id = $stateParams.job_id;
            }
        }

        if ($stateParams.user_id == null) {
            $location.url('/login');
        } else {
            // get job
            console.log("GET Job");
            $http.get(`${API_URL}/user/${$stateParams.user_id}/jobs/${$stateParams.job_id}`)
              .then(function(response) {
                  vm.job = response.data[0];
                  vm.companies = response.data[0].company;
                  vm.allCompanies =response.data[1];
                  console.log("JOB: ", vm.job);
                  console.log("GROUPS:", vm.companies);
                  console.log("ALL GROUPS:", vm.allCompanies);
                  vm.setCheckedCompanies();
              });

              vm.setCheckedCompanies = function() {
                  // this creates an array of all companies associated with an job
                  // making them all initially unchecked in that company array
                  vm.checkedCompanies = [];
                  for (let v = 0; v < vm.allCompanies.length; v++) { // all companies
                      vm.checkedCompanies[v] = {};
                      vm.checkedCompanies[v].id = vm.allCompanies[v].id;
                      vm.checkedCompanies[v].name = vm.allCompanies[v].name;
                      vm.checkedCompanies[v].user_id = vm.allCompanies[v].user_id;
                      vm.checkedCompanies[v].checked = false;
                  }
                  // this checks the companies that are associated with the job
                  for (let x = 0; x < vm.checkedCompanies.length; x++) { // all companies
                      // for (let v = 0; v < allCompanies[x].company.length; v++) { // all companies
                          for (let y = 0; y < vm.companies.length; y++) { // companies associated with job
                              if (vm.companies[y].id == vm.checkedCompanies[x].id) { // if companies exists check the box
                                  // for (let z = 0; z < vm.friends[y].companies.length; z++) { // friends
                                      // if (vm.friends[y].companies[z].id == allCompanies[x].company[v].id) {
                                          vm.checkedCompanies[x].checked = true;
                                      // }
                                  // }
                              }
                          }
                      // }
                  }
                  // sort checkedCompanies array in order
                  vm.checkedCompanies.sort(function(s1, s2) {
                      var l = s1.name.toLowerCase(),
                          m = s2.name.toLowerCase();
                      return l === m ? 0 : l > m ? 1 : -1;
                  });
                  console.log("CHECKED GROUPS:", vm.checkedCompanies);

              }

              vm.companyChecked = function(company_id) {
                  console.log("JOB-CompanyChecked: " + company_id);
                  for (let x = 0; x < vm.checkedCompanies.length; x++) {
                      if (vm.checkedCompanies[x].id == company_id) {
                          // for (let y = 0; y < vm.friends[x].companies.length; y++) {
                              // if (vm.friends[x].companies[y].id == company_id) {
                                  if (vm.checkedCompanies[x].checked == false) {
                                      vm.checkedCompanies[x].checked = true;
                                      console.log("CHECKED !!!");
                                  } else {
                                      vm.checkedCompanies[x].checked = false;
                                      console.log("UNCHECKED !!!");
                                  }
                              // }
                          // }
                      }
                  }
                  console.log("Checked Companies: => ", vm.checkedCompanies);
              }

            vm.updateJob = function(job_id) {
              console.log("Update Job:", job_id);
              let data = [];
              data.push(vm.job);
              data.push(vm.checkedCompanies);
              console.log("DATA", data);
              $http.post(`${API_URL}/user/${$stateParams.user_id}/jobs/${job_id}`, data)
              // $http.patch(`${API_URL}/user/${$stateParams.user_id}/jobs/${job_id}`, data)
                .then(function(response) {
                  console.log(data);
                  $state.go(`jobs`, {
                    user_id: $stateParams.user_id
                  });
                }, function() {
                  console.log('UpdatedJob');
                });
            }

            vm.deleteJob = function(id) {
              $http.delete(`${API_URL}/user/${$stateParams.user_id}/jobs/${id}`)
                  .then(function(data) {
                      console.log(data);
                      $state.go(`jobs`, {
                        user_id: $stateParams.user_id
                      });
                  }, function() {
                      console.log('Delete Company Failed!');
                  });
              console.log("Deleted Job:", id);
            }

            vm.cancelEdit = function() {
              $state.go(`jobs`, {
                user_id: vm.user_id
              });
            }

            // vm.jobEdit = [];
            // vm.editJobInfo = function(id) {
            //     if (vm.jobEdit[id] == false || !vm.jobEdit[id]) {
            //         console.log(vm.jobEdit[id]);
            //         vm.jobEdit[id] = true;
            //     } else {
            //         console.log(vm.jobEdit[id]);
            //         vm.jobEdit[id] = false;
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
