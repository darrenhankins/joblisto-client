(function(){
  'use strict';

  angular
    .module('jobApp')
    .component('companies', {
      controller: 'CompaniesController',
      templateUrl: 'app/companies/companies.html'
    });

})();
