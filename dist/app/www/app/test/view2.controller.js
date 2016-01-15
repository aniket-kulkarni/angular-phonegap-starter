(function() {

    'use strict';

    var app = angular.module('agora.test');

    app.controller('View2Controller',View2Controller);

    function View2Controller() {

        var vm = this;
        vm.name = 'view2';
    }      

})();
