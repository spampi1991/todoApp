(function() {
    'use strict';

    angular
        .module('todoApp.task')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$log', '$q', 'DbUtil', 'uuid4'];

    function TaskService($log, $q, DbUtil, uuid4) {
        var service = {
            save : save
        };
        
        return service;

        function save(task) { 
            var db = DbUtil.openDb();
            var query = "INSERT INTO tasks (id, title, description, creation_date) VALUES (?, ?, ?, ?)";
            var id = uuid4.generate();
            var binding = [id, task.title, task.description, task.creationDate];

            return DbUtil.execute(db, query, binding)
                .then(function() {
                    return id;
                })
                .catch(function(err) {
                    $q.reject(err);
                });
        }

        function find(id) {
            var db = DbUtil.openDb();
            var query = "SELECT id, title, description FROM tasks WHERE id = ?";
            var binding = [id];

            return DbUtil.execute(db, query, binding)
                .then(function() {
                    return id;
                })
                .catch(function(err) {
                    $q.reject(err);
                });
        }
    }
})();