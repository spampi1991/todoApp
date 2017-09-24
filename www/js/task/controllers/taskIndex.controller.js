
(function() {
    'use strict';

    angular
        .module('todoApp.task')
        .controller('TaskIndexController', TaskIndexController);

    TaskIndexController.$inject = ['$log', '$state', '$scope', 'TaskService'];

    function TaskIndexController($log, $state, $scope, TaskService) {
        var vm = this;
        vm.tasks = [];
        vm.showTask = showTask;
        vm.showTaskCreateForm = showTaskCreateForm;

        activate();

        function activate() { 
            refreshTasks();
            $scope.$on('$ionicView.enter', function(){
                refreshTasks();
              });
        }

        function showTask(taskId) {
            $state.go('tasks.show', {id: taskId});
        }

        function showTaskCreateForm() {
            $state.go('tasks.create');
        }

        function refreshTasks() {
            $log.info("Refreshing task");
            vm.tasks = [];
            TaskService.findAll()
                .then(function(tasks) {
                    angular.forEach(tasks, function(task) {
                        vm.tasks.push(task);
                    });
                })
                .catch(function(err) {
                });
        }
    }
})();