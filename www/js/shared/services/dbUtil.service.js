
(function() {
    'use strict';

    angular
        .module('todoApp.shared')
        .factory('DbUtil', DbUtil);

        DbUtil.$inject = ['$log', '$q', '$window'];

    function DbUtil($log, $q, $window) {
        var service = {
            initDb : initDb,
            openDb: openDb,
            execute: execute
        };
        
        return service;

        function openDb() {
            if ($window.sqlitePlugin) {
                $log.info("Cordova sqlitePlugin available!");
                return $window.sqlitePlugin.openDatabase({ name: "todoApp.db", location: 'default' });
            }
            else {
                $log.info("Cordova sqlitePlugin not available, fallback to Web SQL");
                return $window.openDatabase('todoApp.db', '1.0', 'database', -1);
            }
        }

        function initDb() {
            var db = openDb();
            var query = "CREATE TABLE IF NOT EXISTS tasks (id, title, description, creation_date)";

            var q = $q.defer();
            db.transaction(function (tx) {
              tx.executeSql(query, [], function (tx, result) {
                  q.resolve(result);
                },
                function (transaction, error) {
                  q.reject(error);
                });
            });
            return q.promise;
        }

        function execute(db, query, binding) {
            var q = $q.defer();
            db.transaction(function (tx) {
              tx.executeSql(query, binding, function (tx, result) {
                  q.resolve(result);
                },
                function (transaction, error) {
                  q.reject(error);
                });
            });
            return q.promise;
        }
    }
})();