
(function() {
  'use strict';

  angular
    .module('todoApp', [
      'ionic', 
      'ngCordova', 
      'uuid',
      'todoApp.ui',
      'todoApp.task',
      'todoApp.shared'])
    .run(TodoApp);

  TodoApp.$inject = ['$ionicPlatform', 'DbUtil'];

  function TodoApp($ionicPlatform, DbUtil) {
    
    activate();

    function activate() { 
      $ionicPlatform.ready(function() {
        
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
    
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
        DbUtil.initDb();
      });
    }
  }
})();
