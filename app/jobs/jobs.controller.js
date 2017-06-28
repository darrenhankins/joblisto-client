(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('jobApp')
        .controller('JobsController', JobsController);

    function JobsController($scope, $http, $location, $stateParams, $state) {
        console.log("This is the JobsController...");
        const vm = this;

        vm.$onInit = function() {
            if ($stateParams.user_id == null) {
                $location.url('/login');
            } else {
              vm.user_id = $stateParams.user_id;
            }
        }

        if ($stateParams.user_id == null) {
            $location.url('/login');
        } else {
            // get all jobs
            $http.get(`${API_URL}/user/${$stateParams.user_id}/jobs`)
              .then(function(response) {
                  vm.jobs = response.data;
                  // sort jobs in order
                  vm.jobs.sort(function(s1, s2) {
                      var l = s1.name.toLowerCase(),
                          m = s2.name.toLowerCase();
                      return l === m ? 0 : l > m ? 1 : -1;
                  });
              });



            // get one job
            // $http.get('http://localhost:3000/user/1/jobs/1/')

            // vm.updateItem = function(id) {
            //   console.log("Update Item:", id);
            // }
            //
            // vm.deleteItem = function(id) {
            //   console.log("Deleted Item:", id);
            // }

            // vm.jobEdit = [];
            // vm.editItemInfo = function(id) {
            //     if (vm.jobEdit[id] == false || !vm.jobEdit[id]) {
            //         console.log(vm.jobEdit[id]);
            //         vm.jobEdit[id] = true;
            //     } else {
            //         console.log(vm.jobEdit[id]);
            //         vm.jobEdit[id] = false;
            //     }
            // }

            vm.setJobId = function(id) {
                console.log("Job ID:", id);
                vm.jobId = id;
            }

            vm.editJob = function(job_id) {
                console.log("Job Edit ID:", job_id);
                $state.go(`edit`, {
                  user_id: vm.user_id,
                  job_id: job_id
                });
            }
        }
    }

    function getHostUrl() {
        if (window.location.host.indexOf('localhost') != -1) {
            return 'http://localhost:3000';
        } else {
            return 'https://job-app.herokuapp.com';
        }
    }

})();
