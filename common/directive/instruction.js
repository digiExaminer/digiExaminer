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
		}
		$scope.prevQuestion = function(id) {
			currentprev=id-1;
			if (currentprev <= $scope.allTestseriesQuestion.length && currentprev>=0) {
				current = $scope.allTestseriesQuestion[currentprev];
				qdirectionid=$scope.current.qdirectionId;
				if($scope.qdirection[qdirectionid]!=undefined && $scope.qdirection[qdirectionid]!='')
				{
					currentDirection=$scope.qdirection[qdirectionid];
					
				}else{
					currentDirection=[];
					
				}
				
			}
			
		}

	} ])
	.directive('instruction', function() {
		return {
			restrict : 'E',
			controller : 'instructionctrl',
			templateUrl : 'common/template/instruction.html'
		};
	}).directive('instructions', function() {

	return {
		scope : 'false',
		restrict : 'E',
		replace : false,
		transclude : true,
		controller : 'instructionctrl',
		templateUrl : 'common/template/starttest.html'
	};
});