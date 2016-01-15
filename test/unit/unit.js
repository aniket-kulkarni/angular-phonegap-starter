'use strict';

describe('StudentTodoListingController',function() {

  var $scope,$rootScope,studentTodosApiService,controller,controllerConstructor,$state;

  beforeEach(function() {
    module('agora');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();      
      $state  = $injector.get('$state');
      controllerConstructor = $injector.get('$controller');
    });   
  })

  it('should call getTodosForStudent of studentTodosApiService when todos is not fetched',function() {
    
    controller = controllerConstructor('AppController as app',{$scope : $scope });
    expect($scope.app.name).toBe('app');
  });

});

