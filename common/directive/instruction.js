angular.module('app')
	.controller('instructionctrl', [ '$scope', 'UserService', '$rootScope', function($scope, UserService, $rootScope) {


		$scope.openconfirmdialog = function() {
			swal({
				title : "Are you sure to start?",
				text : "Once test started,You can't go back else test will be closed!",
				icon : "warning",
				buttons : true,
				dangerMode : true,
			}).then(function(value) {
				if (value) {
					swal("Your test is going to start in a moment!!! All the Best", {
						icon : "success",
					}).then(function(value) {
						$rootScope.showtest = true;
						$rootScope.showinstruction = false;
						$scope.$apply();
					});
				} else {
					swal("You can start the later");
				}
			});
		}
		$scope.allTestseriesQuestion = [ {
			questinId : 1,
			'questindesc' : 'Which of the following is a subset of  {b, c, d}?1',
			option : [ 'a', '100', '500', '400' ],
			qdirectionId:1
		},
			{
				questinId : 2,
				'questindesc' : 'Which of the following is a subset of  {b, c, d}?2',
				option : [ 'a', '100', '500', '400' ],
				qdirectionId:1
			},
			{
				questinId : 3,
				'questindesc' : 'Which of the following is a subset of  {b, c, d}?3',
				option : [ 'a', '100', '500', '400' ],
				qdirectionId:1
			},
			{
				questinId : 4,
				'questindesc' : 'Which of the following is a subset of  {b, c, d}?4',
				option : [ 'a', '100', '500', '400' ],
				qdirectionId:2
			},
			{
				questinId : 5,
				'questindesc' : 'Which of the following is a subset of  {b, c, d}?5',
				option : [ 'a', '100', '500', '400' ],
				qdirectionId:2
			},
			{
				questinId : 6,
				'questindesc' : 'Which of the following is a subset of  {b, c, d}?6',
				option : [ 'a', '100', '500', '400' ],
				qdirectionId:'0'
			} ];
		$scope.qdirection = { 
				
				"1" : {
					id : 1,
					dirdescmain : "hi you have to go through this",
					totaldirection : [ {
						id : 1,
						displayvalue : "(A)",
						dirdesc : "you can't go left"
					}, {
						id : 2,
						displayvalue : "(B)",
						dirdesc : "you can't go left"
					},
						{
							id : 3,
							displayvalue : "(C)",
							dirdesc : "you can't go left"
						}, {
							id : 4,
							displayvalue : "(D)",
							dirdesc : "you can't go left"
						}, {
							id : 5,
							displayvalue : "(E)",
							dirdesc : "you can't go left"
						}

					]
				
			},
						"2" : {
					id : 1,
					dirdescmain : "hi you have to go through this 2",
					totaldirection : [ {
						id : 1,
						displayvalue : "(A)",
						dirdesc : "you can't go left2"
					}, {
						id : 2,
						displayvalue : "(B)",
						dirdesc : "you can't go left"
					},
						{
							id : 3,
							displayvalue : "(C)",
							dirdesc : "you can't go left"
						}, {
							id : 4,
							displayvalue : "(D)",
							dirdesc : "you can't go left"
						}, {
							id : 5,
							displayvalue : "(E)",
							dirdesc : "you can't go left"
						}

					]
				
			}
			
	  
	};
		$scope.current = $scope.allTestseriesQuestion[0];
		qdirectionid=$scope.current.qdirectionId;
		if($scope.qdirection[qdirectionid]!=undefined || $scope.qdirection[qdirectionid]!='undefined' || $scope.qdirection[qdirectionid]!='')
		{
			$scope.currentDirection=$scope.qdirection[qdirectionid];
			
		}else{
			$scope.currentDirection=[];
			
		}
		$scope.nextquestion = function(id) {
			if (id < $scope.allTestseriesQuestion.length) {
				$scope.current = $scope.allTestseriesQuestion[id];
				qdirectionid=$scope.current.qdirectionId;
				if($scope.qdirection[qdirectionid]!=undefined && $scope.qdirection[qdirectionid]!='')
				{
					$scope.currentDirection=$scope.qdirection[qdirectionid];
					
				}else{
					$scope.currentDirection=[];
					
				}
				
			}
		};
		$scope.prevquestion = function(id) {
			currentprev=id-2;
			if (currentprev < $scope.allTestseriesQuestion.length && currentprev>=0) {
				$scope.current = $scope.allTestseriesQuestion[currentprev];
				qdirectionid=$scope.current.qdirectionId;
				if($scope.qdirection[qdirectionid]!=undefined && $scope.qdirection[qdirectionid]!='')
				{
					$scope.currentDirection=$scope.qdirection[qdirectionid];
					
				}else{
					$scope.currentDirection=[];
					
				}
				
			}
		}
		$rootScope.totalquestion={ 
				
				"1" : {
				
					totaldirection : [ {
						id : 1
				
					}, {
						id : 2
					
					},
						{
							id : 3
						}, {
							id : 4
						}, {
							id : 5
						}

					]
				
			},
						"2" : {
				
					totaldirection : [ {
						id : 21
				
					}, {
						id : 22
					
					},
						{
							id : 23
						}, {
							id : 24
						}, {
							id : 25
						}

					]
				
			},
			"3" : {
				
					totaldirection : [ {
						id : 31
				
					}, {
						id : 32
					
					},
						{
							id : 33
						}, {
							id : 34
						}, {
							id : 35
						}

					]
				
			}
					
				
			}
		console.log($rootScope.totalquestion);
			


	} ]).filter('slice', function() {
		cars=$rootScope.totalquestion;
		  return function(cars, start, end) {
			    return cars.slice(start, end);
			  };
			})
	.directive('instruction', function() {
		return {
			restrict : 'E',
			controller : 'instructionctrl',
			templateUrl : 'common/template/instruction.html'
		};
	}).directive('instructions', function() {

	return {
		scope : 'true',
		restrict : 'E',
		replace : false,
		transclude : true,
		controller : 'instructionctrl',
		templateUrl : 'common/template/starttest.html'
	};
}).directive('countdown', [
    'Util', '$interval', function(Util, $interval) {
        return {
          restrict: 'A',
          scope: {
            date: '@'
          },
          link: function(scope, element) {
            var future;
            date='October 2, 2017 4:00:00';
            future = new Date(date);
            $interval(function() {
              var diff;
              diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
              return element.text(Util.dhms(diff));
            }, 1000);
          }
        };
      }
    ]).factory('Util', [
      function() {
        return {
          dhms: function(t) {
            var hours, minutes, seconds;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
            return [hours + 'h', minutes + 'm', seconds + 's'].join(' ');
          }
        };
      }
    ]);;