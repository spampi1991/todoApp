
(function() {
    'use strict';

    angular
        .module('todoApp')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$rootScope', '$log'];

    function MenuController($rootScope, $log) {
        var vm = this;

        activate();

        function activate() {
         }
    }
})();