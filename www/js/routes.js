
(function() {
    'use strict';

    angular
        .module('todoApp')
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
          
              .state('todo', {
                url: '/todo',
                abstract: true,
                templateUrl: 'js/ui/templates/menu.html',
                controller: 'MenuController as menuCtrl'
            })
          
            .state('todo.create', {
              url: '/create',
              views: {
                'menuContent': {
                  templateUrl: 'js/task/templates/taskCreate.html',
                  controller: 'TaskCreateController as taskCreateCtrl'
                }
              }
            });

            $urlRouterProvider.otherwise('/todo/create');
          });
    }
)();