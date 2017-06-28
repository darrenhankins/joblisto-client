(function(){
  'use strict';

  const API_URL = getHostUrl();

  angular
    .module('sumApp')
    .controller('SignupController', SignupController);

    function SignupController($scope, $http, $location) {
      console.log('Signup controller....');
      const vm =  this;

      vm.$onInit = function(){
        vm.signUpFailed = false;
        vm.passwordsFailed = false;

      }

      vm.resetForm = function() {
          // vm.data.$setPristine();
          // if (vm.loginForm) vm.loginForm.$setPristine();
          // vm.signupForm.username = null;
          vm.signupForm.email = null;
          // vm.signupForm.password = null;
          // vm.signupForm.password2 = null;
          // vm.loginForm.setUntouched();
      }

      vm.signup = function(){
        if (vm.signupForm.password == vm.signupForm.password2){
          console.log(vm.signupForm);
          $http.post(`${API_URL}/token/signup`, vm.signupForm)
            .then(data =>{
              $('#pleaseWaitDialog').modal('hide');
              console.log("Data: ", data.data.status);
              switch(data.data.status) {
                case 'failure':
                  vm.signUpFailed = true;
                  vm.passwordsFailed = false;
                  vm.message = data.data.message;
                  vm.resetForm();
                  console.log(data.data.message);
                  break;
                default:
                  $location.url('/');
              }
            });
        } else {
          vm.signupForm.password = null;
          vm.signupForm.password2 = null;
          vm.passwordsFailed = true;
          vm.message = "Passwords do not match.";
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
