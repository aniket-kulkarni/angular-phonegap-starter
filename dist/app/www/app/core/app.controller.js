(function() {

    'use strict';

    var app = angular.module('agora.core');

    app.controller('AppController',AppController);

    function AppController() {

        var vm = this;
        vm.name = 'app';
    }      

})();
