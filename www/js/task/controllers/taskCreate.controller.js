
(function() {
    'use strict';

    angular
        .module('todoApp.task')
        .controller('TaskCreateController', TaskCreateController);

    TaskCreateController.$inject = ['TaskService', '$ionicPopup', '$log', '$state'];

    function TaskCreateController(TaskService, $ionicPopup, $log, $state) {
        var vm = this;
        vm.task = { title: '', description: '', creationDate: new Date() }
        vm.save = save;

        activate();

        function activate() { }

        function save() {
            TaskService.save(vm.task)
                .then(function(taskId) {
                    $log.info(taskId);
                    $state.go('tasks.detail', {id: taskId});
                })
                .catch(function(err) {
                    $ionicPopup.alert({
                        title: 'Something went wrong',
                        template: err.message
                      });
                });
        }
    }
})();