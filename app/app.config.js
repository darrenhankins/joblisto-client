(function(){
  'use strict';

  angular
    .module('jobApp')
    .config(config);

    function config($stateProvider, $urlRouterProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
      .state({
        name: 'login',
        component: 'login',
        params: {
          user_id: null
        },
        url: '/'
      })
      // .state({
      //   name: 'signup',
      //   component: 'signup',
      //   url: '/signup'
      // })
      // .state({
      //   name: 'claim',
      //   component: 'claim',
      //   // url: '/claim'
      //   // 'http://localhost:3005/claim/item/1/friend/2/uuid/7a955f98-2619-40c7-95c9-1a64a3e06741'
      //   url: '/claim/item/:item_id/friend/:friend_id/uuid/:uuid'
      // })
      // .state({
      //   name: 'profile',
      //   component: 'profile',
      //   url: '/profile/:id'
      // })
      .state({
        name: 'jobs',
        component: 'jobs',
        params: {
          user_id: null
        },
        // url: '/profile/:id/items'
        url: '/jobs'
      })
      // .state({
      //   name: 'edit',
      //   component: 'edit',
      //   params: {
      //     user_id: null,
      //     item_id: null
      //   },
      //   // url: '/profile/:id/items'
      //   url: '/edit'
      // })
      // .state({
      //   name: 'add',
      //   component: 'add',
      //   params: {
      //     user_id: null
      //   },
      //   // url: '/profile/:id/add'
      //   url: '/add'
      // })
      // .state({
      //   name: 'sendemail',
      //   component: 'sendemail',
      //   url: '/profile/:id/sendemail'
      // })
      // .state({
      //   name: 'companies',
      //   component: 'companies',
      //   params: {
      //     user_id: null
      //   },
      //   url: '/companies'
      //   // url: '/profile/:id/companies'
      // })
      // .state({
      //   name: 'mentors',
      //   component: 'mentors',
      //   params: {
      //     user_id: null
      //   },
      //   url: '/mentors'
      //   // url: '/profile/:id/mentors'
      // })
      ;

      $urlRouterProvider.otherwise('/');
    }

})();
