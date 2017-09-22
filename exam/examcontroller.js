(function () {
    'use strict';

    angular
            .module('app')
            .controller('examController', examController);

    examController.$inject = ['$scope', 'UserService', '$rootScope'];
    function examController($scope, UserService, $rootScope) {
       $rootScope.showtest=false;
       $rootScope.showinstruction=true; 
     
    }
})();