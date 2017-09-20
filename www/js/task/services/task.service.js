(function() {
    'use strict';

    angular
        .module('todoApp.task')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$cordovaSQLite', '$log', '$q'];

    function TaskService($cordovaSQLite, $log, $q) {
        var service = {
            save : save
        };
        
        return service;

        function save(task) { 
            var db = $cordovaSQLite.openDB({ name: "todoApp.db", location: 'default' });
            var query = "INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)";

            $cordovaSQLite.execute(db, query, [task.title, task.description, task.dueDate]).then(function(res) {
              $log.info(res);
              return res.insertId;
              
            }, function (err) {
                $log.error(err)
                return $q.reject();
            });
        }
    }
})();