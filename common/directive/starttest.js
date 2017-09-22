angular.module('app')
.controller('instructionctrler', ['$scope', 'UserService', '$rootScope', function($scope, UserService, $rootScope) {
        
    
        $scope.openconfirmdialog = function () {
            swal({
                title: "Are you sure to start?",
                text: "Once test started,You can't go back else test will be closed!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(function (value) {
                if (value) {
                    swal("Your test is going to start in a moment!!! All the Best", {
                        icon: "success",
                    }).then(function (value) {
                        $rootScope.showtest=true; 
                    });
                } else {
                    swal("You can start the later");
                }
            });
        }

}])
.directive('instructions', function() {
  return {
    restrict: 'E',
    replace: false,
    transclude: true,
    controller: 'instructionctrler',
    templateUrl: 'common/template/starttest.html'
  };
});