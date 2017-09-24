
(function() {
    'use strict';

    angular
        .module('todoApp.task')
        .controller('TaskShowController', TaskShowController);

    TaskShowController.$inject = ['$stateParams', '$log', '$ionicPopup', '$state', 'TaskService'];

    function TaskShowController($stateParams, $log, $ionicPopup, $state, TaskService) {
        var vm = this;
        vm.task = {};
        vm.deleteTask = deleteTask;

        activate();

        function activate() { 
            $log.info("Display task: " + $stateParams.id);
            TaskService.findOne($stateParams.id)
                .then(function(task) {
                    $log.info(task);
                    vm.task = task;
                })
                .catch(function(err) {
                    $log.error(err);
                });
        }

        function deleteTask(id) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Attenzione!',
                template: 'Sei sicuro di volere eliminare questa attività ?'
              });
           
              confirmPopup.then(function(res) {
                if (res) {
                  TaskService.remove(vm.task.id)
                    .then(function(res) {
                        $state.go('tasks.index', {}, {reload: true});
                    })
                    .catch(function(res) {

                    });
                } else {
                  $log.info("Task deletion aborted");
                }
              });
        }
    }
})();