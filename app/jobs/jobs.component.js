(function(){
  'use strict';

  angular
    .module('jobApp')
    .component('jobs', {
      controller: 'JobsController',
      templateUrl: 'app/jobs/jobs.html'
    })
})();
