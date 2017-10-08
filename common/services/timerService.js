 var app = angular.module("app");
//Modulu olusturduk. Modul herhangi bir DI'ye ihtiyaç duymuyor


//timeout and scope are Angular's built-in services
//Adding injector
//Module timeout ve scope servislerini ekledik. Bunlar Anguların bizim için sağladığı yapısal servislerdir.
 app.service('timerService',['$scope','$timeout', function($scope,$timeout){

 //Adding initial value for counter
 //counter modelimiz için ilk değer atamasını yaptık.   
$scope.counter = 6;
var stopped;

//timeout function
//1000 milliseconds = 1 second
//Every second counts
//Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.  
$scope.countdown = function() {
    stopped = $timeout(function() {
      if($scope.counter>0){
       console.log($scope.counter);
     $scope.counter--;
    $scope.h = Math.floor($scope.counter / 3600);
    $scope.m = Math.floor($scope.counter % 3600 / 60);
    $scope.s = Math.floor($scope.counter % 3600 % 60);
     $scope.countdown();   
    }else{
      $timeout.cancel(stopped);
    }}, 1000);
  };
   
    
$scope.stop = function(){
   $timeout.cancel(stopped);
    
    } 


}]);