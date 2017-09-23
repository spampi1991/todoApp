
(function() {
    'use strict';

    angular
        .module('todoApp')
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
              .state('tasks', {
                url: '/tasks',
                abstract: true,
                templateUrl: 'js/ui/templates/menu.html',
                controller: 'MenuController as menuCtrl'
            })
          
            .state('tasks.create', {
              url: '/create',
              views: {
                'menuContent': {
                  templateUrl: 'js/task/templates/taskCreate.html',
                  controller: 'TaskCreateController as taskCreateCtrl'
                }
              }
            })

            .state('tasks.detail', {
              url: '/:id',
              views: {
                'menuContent': {
                  templateUrl: 'js/task/templates/taskDetail.html',
                  controller: 'TaskDetailController as taskDetailCtrl'
                }
              }
            });

            $urlRouterProvider.otherwise('/tasks/create');

          });
    }
)();