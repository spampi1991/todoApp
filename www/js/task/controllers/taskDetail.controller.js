
(function() {
    'use strict';

    angular
        .module('todoApp.task')
        .controller('TaskDetailController', TaskDetailController);

    TaskDetailController.$inject = ['$log', 'TaskService', '$stateParams'];

    function TaskDetailController($log, TaskService, $stateParams) {
        var vm = this;
        vm.task = {id: '', title: '', description: '', creationDate: ''};

        activate();

        function activate() { 
            $log.info("Display task: " + $stateParam.id);
            TaskService.find($stateParam.id)
                .then(function(res) {
                    $log.info(res);
                })
                .catch(function(err) {
                    $log.error(err);
                });
        }
    }
})();