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
		
	} ])
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
		controller : 'quizCtrl',
		templateUrl : 'common/template/starttest.html'
	};
});


var quizCtrl = function ($scope, $http, helper,$timeout) {
    /***********timer************/
    //Adding initial value for counter
    //counter modelimiz için ilk değer atamasını yaptık.   
   $scope.counter = 3200;
   var stopped;

   //timeout function
   //1000 milliseconds = 1 second
   //Every second counts
   //Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.  
   $scope.countdown = function() {
       stopped = $timeout(function() {
         if($scope.counter>0){
        	 if($scope.counter<300){
        		 angular.element(document).find('.timer-block').css("color","red");
        	 }
         
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
/*****************end timer ***************/
	$scope.countdown();
    $scope.quizName = 'data/csharp.js';

    //Note: Only those configs are functional which is documented at: http://www.codeproject.com/Articles/860024/Quiz-Application-in-AngularJs
    // Others are work in progress.
    $scope.defaultConfig = {
        'allowBack': true,
        'allowReview': true,
        'autoMove': false,  // if true, it will move to next question automatically when answered.
        'duration': 0,  // indicates the time in which quiz needs to be completed. post that, quiz will be automatically submitted. 0 means unlimited.
        'pageSize': 1,
        'requiredAll': false,  // indicates if you must answer all the questions before submitting.
        'richText': false,
        'shuffleQuestions': false,
        'shuffleOptions': false,
        'showClock': true,
        'showPager': true,
        'theme': 'none'
    }
	$scope.currentQuestion;
	$scope.currentOption;

    $scope.goTo = function (index) {
    	
        if (index > 0 && index <= $scope.totalItems) {
        	$scope.currentQuestion=question="";
        	$scope.currentOption=option="";
            $scope.currentPage = index;
            $scope.mode = 'quiz';
        }
    }

    $scope.onSelect = function (question, option) {
    	$scope.currentQuestion=question;
    	$scope.currentOption=option;
        if (question.QuestionTypeId == 1) {
            question.Options.forEach(function (element, index, array) {
            	 element.isReviewed = false;
                if (element.Id != option.Id) {
                    element.Selected = false;
                    //question.Answered = element.Id;
                }
            });
        }

       
    }
    $scope.markedReview= function () {
    	$scope.currentQuestion;
    	$scope.currentOption;
    	if($scope.currentQuestion!="" && $scope.currentOption!=""){
        if ($scope.currentQuestion.QuestionTypeId == 1) {
        	$scope.currentQuestion.Options.forEach(function (element, index, array) {
                
                	
                    element.isReviewed = true;
                    //question.Answered = element.Id;
                
            });
        }

    	}
    }
    $scope.onSubmit = function () {
        var answers = [];
        $scope.questions.forEach(function (q, index) {
            answers.push({ 'QuizId': $scope.quiz.Id, 'QuestionId': q.Id, 'Answered': q.Answered,isReviewed });
        });
        // Post your data to the server here. answers contains the questionId and the users' answer.
        //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
        //    alert(data);
        //});
        console.log($scope.questions);
        $scope.mode = 'result';
    }

    $scope.pageCount = function () {
        return Math.ceil($scope.questions.length / $scope.itemsPerPage);
    };

    //If you wish, you may create a separate factory or service to call loadQuiz. To keep things simple, i have kept it within controller.
    $scope.loadQuiz = function (file) {
        $http.get(file)
         .then(function (res) {
             $scope.quiz = res.data.quiz;
             $scope.instructions = res.data.questionsInstruction;
             console.log($scope.instructions);
             $scope.config = helper.extend({}, $scope.defaultConfig, res.data.config);
             $scope.questions = $scope.config.shuffleQuestions ? helper.shuffle(res.data.questions) : res.data.questions;
             $scope.totalItems = $scope.questions.length;
             $scope.itemsPerPage = $scope.config.pageSize;
             $scope.currentPage = 1;
             $scope.mode = 'quiz';

             $scope.$watch('currentPage + itemsPerPage', function () {
                 var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                   end = begin + $scope.itemsPerPage;

                 $scope.filteredQuestions = $scope.questions.slice(begin, end);
                 instrucionid=$scope.filteredQuestions[0].instructionid;
                 $scope.filteredQuestionsInstruction = $.map($scope.instructions, function(val) {
                	    return val.Id == instrucionid ? val: [];
                 });
                 
                 console.log($scope.filteredQuestionsInstruction+"ins");
                 
             });
         });
    }
    $scope.loadQuiz($scope.quizName);

    $scope.isAnswered = function (index) {
        var answered = 'Not Answered';
        $scope.questions[index].Options.forEach(function (element, index, array) {
            if (element.Selected == true && element.isReviewed==false) {
                answered = 'Answered';
                return false;
            }
            else if(element.Selected == true && element.isReviewed == true){
            	 answered = 'Reviewed';
                 return false;
            }
        });
        return answered;
    };

    $scope.isCorrect = function (question) {
        var result = 'correct';
        question.Options.forEach(function (option, index, array) {
            if (helper.toBool(option.Selected) != option.IsAnswer) {
                result = 'wrong';
                return false;
            }
        });
        return result;
    };

    
    
}

quizCtrl.$inject = ['$scope', '$http', 'helperService','$timeout'];
angular.module('app').controller('quizCtrl', quizCtrl);