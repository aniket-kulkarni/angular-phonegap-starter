(function() {

    'use strict';

    var app = angular.module('agora.test');

    app.controller('HomeController',HomeController);

    function HomeController() {

        var vm = this;
        vm.name = 'home';
    }      

})();
