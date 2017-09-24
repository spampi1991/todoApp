
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

            .state('tasks.index', {
              url: '/index',
              views: {
                'menuContent': {
                  templateUrl: 'js/task/templates/taskIndex.html',
                  controller: 'TaskIndexController as taskIndexCtrl'
                }
              }
            })

            .state('tasks.show', {
              url: '/:id',
              views: {
                'menuContent': {
                  templateUrl: 'js/task/templates/taskShow.html',
                  controller: 'TaskShowController as taskShowCtrl'
                }
              }
            });

            $urlRouterProvider.otherwise('/tasks/index');
          });
    }
)();