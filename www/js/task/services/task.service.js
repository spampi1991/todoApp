(function() {
    'use strict';

    angular
        .module('todoApp.task')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$log', '$q', 'DbUtil', 'uuid4'];

    function TaskService($log, $q, DbUtil, uuid4) {
        var service = {
            save : save,
            findOne: findOne,
            findAll: findAll,
            remove: remove,
            update: update
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

        function findOne(id) {
            var db = DbUtil.openDb();
            var query = "SELECT id, title, description FROM tasks WHERE id = ?";
            var binding = [id];

            return DbUtil.execute(db, query, binding)
                .then(function(res) {
                    return res.rows[0];
                })
                .catch(function(err) {
                    $q.reject(err);
                });
        }

        function findAll() {
            var db = DbUtil.openDb();
            var query = "SELECT id, title, description FROM tasks";
            var binding = [];

            return DbUtil.execute(db, query, binding)
                .then(function(res) {
                    $log.info(res);
                    return res.rows;
                })
                .catch(function(err) {
                    $q.reject(err);
                });
        }

        function remove(id) {
            var db = DbUtil.openDb();
            var query = "DELETE FROM tasks WHERE id = ?";
            var binding = [id];

            return DbUtil.execute(db, query, binding)
                .then(function(res) {
                    $log.info(res);
                })
                .catch(function(err) {
                    $q.reject(err);
                });
        }

        function update(task) {

        }
    }
})();