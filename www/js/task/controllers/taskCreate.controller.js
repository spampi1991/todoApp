
(function() {
    'use strict';

    angular
        .module('todoApp.task')
        .controller('TaskCreateController', TaskCreateController);

        TaskCreateController.$inject = ['TaskService', '$ionicPopup'];

    function TaskCreateController(TaskService, $ionicPopup) {
        var vm = this;
        vm.task = { title: '', description: '', dueDate: new Date() }
        vm.save = save;

        activate();

        ////////////////

        function activate() { }

        function save() {
            TaskService.save(vm.task)
                .then(function(res){
                    $ionicPopup.alert({
                        title: 'Yeah, you\'ve done it',
                        template: 'Task successfully submitted!'
                      }).show();
                })
                .catch(function(err){
                    $ionicPopup.alert({
                        title: 'Something went wrong',
                        template: 'Fuck :('
                      }).show();
                });
        }
    }
})();